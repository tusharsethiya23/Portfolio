/*
  Fluid name: a small stable-fluids simulation (WebGL2) that stirs the
  hero name like ink in water.

  - A velocity field is simulated at low resolution (advection, vorticity
    confinement for swirls, pressure projection to keep it fluid-like).
  - An offset field is carried along by that flow and slowly relaxes to
    zero, so letters swirl and stretch, then drift back into shape.
  - The name is drawn into a texture from the real DOM letters, and the
    canvas only replaces the DOM text while the fluid is moving.

  Based on the well-known stable fluids approach (Jos Stam), with the
  structure popularised by Pavel Dobryakov's WebGL fluid demo.
*/

const SETTINGS = {
  simResolution: 128,
  pressureIterations: 20,
  velocityDissipation: 0.6, // higher = the water calms sooner
  curl: 28, // swirliness
  splatForce: 5000, // how hard the pointer pushes
  splatRadius: 0.35, // size of the push, % of the name height
  offsetStrength: 1.0, // how far letters get carried
  offsetRelax: 0.965, // per frame; lower = letters reform faster
  idleMs: 4500, // stop simulating this long after the last input
};

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
uniform vec2 uTexel;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 o;
`;

const FRAG = {
  clear: `${HEAD}
uniform sampler2D uTexture; uniform float uValue;
void main() { o = uValue * texture(uTexture, vUv); }`,

  splat: `${HEAD}
uniform sampler2D uTarget; uniform float uAspect; uniform vec3 uColor;
uniform vec2 uPoint; uniform float uRadius;
void main() {
  vec2 p = vUv - uPoint; p.x *= uAspect;
  vec3 s = exp(-dot(p, p) / uRadius) * uColor;
  o = vec4(texture(uTarget, vUv).xyz + s, 1.0);
}`,

  advect: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uSource;
uniform vec2 uTexel; uniform float uDt; uniform float uDissipation;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uTexel;
  o = texture(uSource, coord) / (1.0 + uDissipation * uDt);
}`,

  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,

  vorticity: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uCurl;
uniform float uCurlStrength; uniform float uDt;
void main() {
  float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 0.0001;
  f *= uCurlStrength * C; f.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + f * uDt;
  o = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`,

  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,

  pressure: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  float d = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
}`,

  gradient: `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(v, 0.0, 1.0);
}`,

  // Offset field: carried by the flow, accumulates motion, relaxes to zero
  offset: `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uOffset;
uniform vec2 uTexel; uniform float uDt; uniform float uRelax; uniform float uStrength;
void main() {
  vec2 vel = texture(uVelocity, vUv).xy * uTexel;
  vec2 off = texture(uOffset, vUv - uDt * vel).xy;
  o = vec4(off * uRelax + uDt * vel * uStrength, 0.0, 1.0);
}`,

  display: `${HEAD}
uniform sampler2D uText; uniform sampler2D uOffset;
void main() {
  vec2 off = texture(uOffset, vUv).xy;
  o = texture(uText, vUv - off);
}`,
};

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function program(gl, vert, fragSource) {
  const p = gl.createProgram();
  gl.attachShader(p, vert);
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fragSource));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));

  const uniforms = {};
  const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(p, i).name;
    uniforms[name] = gl.getUniformLocation(p, name);
  }
  return { p, uniforms };
}

function createFBO(gl, w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.viewport(0, 0, w, h);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return { tex, fbo, w, h };
}

function createDoubleFBO(gl, w, h) {
  let read = createFBO(gl, w, h);
  let write = createFBO(gl, w, h);
  return {
    get read() { return read; },
    get write() { return write; },
    swap() { [read, write] = [write, read]; },
  };
}

/*
  Attach the fluid to a name element.
  - host:    the element the canvas covers (the h1)
  - letters: the DOM letter elements, used to draw the name texture
  Returns { pointerMove(e), pointerLeave(), destroy() } or null when
  WebGL2 / float render targets aren't available (the name then stays static).
*/
export function createFluidName(host, letters) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    opacity: "0",
  });

  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) return null;
  host.appendChild(canvas);

  let vert;
  let programs;
  try {
    vert = compile(gl, gl.VERTEX_SHADER, VERT);
    programs = Object.fromEntries(Object.entries(FRAG).map(([k, src]) => [k, program(gl, vert, src)]));
  } catch {
    canvas.remove();
    return null;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const textTex = gl.createTexture();
  const textCanvas = document.createElement("canvas");

  let sim = null; // { w, h, velocity, offset, pressure, divergence, curl }
  let width = 0;
  let height = 0;
  let running = false;
  let frame = 0;
  let lastTime = 0;
  let lastInput = 0;
  let lastPointer = null;
  const splats = [];

  const blit = (target) => {
    if (target) {
      gl.viewport(0, 0, target.w, target.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const use = (name, texel) => {
    const prog = programs[name];
    gl.useProgram(prog.p);
    if (prog.uniforms.uTexel && texel) gl.uniform2f(prog.uniforms.uTexel, texel[0], texel[1]);
    return prog.uniforms;
  };

  const bindTex = (unit, tex) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    return unit;
  };

  // Size the canvas and sim to the name, and redraw the name texture
  const prepare = () => {
    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));

    if (w !== width || h !== height || !sim) {
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;

      const aspect = w / h;
      const base = SETTINGS.simResolution;
      const sw = Math.round(aspect > 1 ? base * aspect : base);
      const sh = Math.round(aspect > 1 ? base : base / aspect);
      sim = {
        w: sw,
        h: sh,
        velocity: createDoubleFBO(gl, sw, sh),
        offset: createDoubleFBO(gl, sw, sh),
        pressure: createDoubleFBO(gl, sw, sh),
        divergence: createFBO(gl, sw, sh),
        curl: createFBO(gl, sw, sh),
      };
    }

    // Draw each DOM letter at its exact on-screen position
    textCanvas.width = w;
    textCanvas.height = h;
    const ctx = textCanvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    ctx.scale(dpr, dpr);
    letters.forEach((el) => {
      if (!el) return;
      const style = getComputedStyle(el);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = style.color;
      ctx.textBaseline = "alphabetic";
      const m = ctx.measureText(el.textContent);
      const ascent = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
      const descent = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent;
      const r = el.getBoundingClientRect();
      const baseline = r.top - rect.top + (r.height - (ascent + descent)) / 2 + ascent;
      const x = r.left - rect.left;

      // Match a CSS text-stroke used to thicken the letters (painted under the fill)
      const strokeWidth = parseFloat(style.webkitTextStrokeWidth) || 0;
      if (strokeWidth > 0) {
        ctx.lineWidth = strokeWidth;
        ctx.lineJoin = "round";
        ctx.strokeStyle = style.webkitTextStrokeColor || style.color;
        ctx.strokeText(el.textContent, x, baseline);
      }
      ctx.fillText(el.textContent, x, baseline);
    });

    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };

  const resetFields = () => {
    if (!sim) return;
    for (const field of [sim.velocity, sim.offset, sim.pressure]) {
      for (const fbo of [field.read, field.write]) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fbo);
        gl.viewport(0, 0, fbo.w, fbo.h);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    }
  };

  const applySplat = ({ x, y, dx, dy }) => {
    const aspect = width / height;
    const u = use("splat", null);
    gl.uniform1i(u.uTarget, bindTex(0, sim.velocity.read.tex));
    gl.uniform1f(u.uAspect, aspect);
    gl.uniform2f(u.uPoint, x, y);
    gl.uniform3f(u.uColor, dx * SETTINGS.splatForce, dy * SETTINGS.splatForce, 0);
    gl.uniform1f(u.uRadius, (SETTINGS.splatRadius / 100) * Math.max(1, aspect));
    blit(sim.velocity.write);
    sim.velocity.swap();
  };

  const step = (dt) => {
    const texel = [1 / sim.w, 1 / sim.h];

    let u = use("curl", texel);
    gl.uniform1i(u.uVelocity, bindTex(0, sim.velocity.read.tex));
    blit(sim.curl);

    u = use("vorticity", texel);
    gl.uniform1i(u.uVelocity, bindTex(0, sim.velocity.read.tex));
    gl.uniform1i(u.uCurl, bindTex(1, sim.curl.tex));
    gl.uniform1f(u.uCurlStrength, SETTINGS.curl);
    gl.uniform1f(u.uDt, dt);
    blit(sim.velocity.write);
    sim.velocity.swap();

    u = use("divergence", texel);
    gl.uniform1i(u.uVelocity, bindTex(0, sim.velocity.read.tex));
    blit(sim.divergence);

    u = use("clear", texel);
    gl.uniform1i(u.uTexture, bindTex(0, sim.pressure.read.tex));
    gl.uniform1f(u.uValue, 0.8);
    blit(sim.pressure.write);
    sim.pressure.swap();

    u = use("pressure", texel);
    gl.uniform1i(u.uDivergence, bindTex(0, sim.divergence.tex));
    for (let i = 0; i < SETTINGS.pressureIterations; i++) {
      gl.uniform1i(u.uPressure, bindTex(1, sim.pressure.read.tex));
      blit(sim.pressure.write);
      sim.pressure.swap();
    }

    u = use("gradient", texel);
    gl.uniform1i(u.uPressure, bindTex(0, sim.pressure.read.tex));
    gl.uniform1i(u.uVelocity, bindTex(1, sim.velocity.read.tex));
    blit(sim.velocity.write);
    sim.velocity.swap();

    u = use("advect", texel);
    gl.uniform1i(u.uVelocity, bindTex(0, sim.velocity.read.tex));
    gl.uniform1i(u.uSource, bindTex(0, sim.velocity.read.tex));
    gl.uniform1f(u.uDt, dt);
    gl.uniform1f(u.uDissipation, SETTINGS.velocityDissipation);
    blit(sim.velocity.write);
    sim.velocity.swap();

    u = use("offset", texel);
    gl.uniform1i(u.uVelocity, bindTex(0, sim.velocity.read.tex));
    gl.uniform1i(u.uOffset, bindTex(1, sim.offset.read.tex));
    gl.uniform1f(u.uDt, dt);
    gl.uniform1f(u.uRelax, SETTINGS.offsetRelax);
    gl.uniform1f(u.uStrength, SETTINGS.offsetStrength);
    blit(sim.offset.write);
    sim.offset.swap();
  };

  const render = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const u = use("display", null);
    gl.uniform1i(u.uText, bindTex(0, textTex));
    gl.uniform1i(u.uOffset, bindTex(1, sim.offset.read.tex));
    blit(null);
  };

  const show = (on) => {
    canvas.style.opacity = on ? "1" : "0";
    // hide the DOM letters (fill and any stroke) while the canvas draws the name
    host.style.color = on ? "transparent" : "";
    host.style.webkitTextStrokeColor = on ? "transparent" : "";
  };

  const loop = (now) => {
    const dt = Math.min((now - lastTime) / 1000, 1 / 30);
    lastTime = now;

    while (splats.length) applySplat(splats.shift());
    step(dt);
    render();

    if (now - lastInput > SETTINGS.idleMs) {
      running = false;
      show(false);
      resetFields();
      return;
    }
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) return;
    prepare();
    resetFields();
    running = true;
    lastTime = performance.now();
    show(true);
    frame = requestAnimationFrame(loop);
  };

  return {
    pointerMove(e) {
      const rect = host.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (lastPointer) {
        const dx = x - lastPointer.x;
        const dy = y - lastPointer.y;
        if (dx || dy) {
          splats.push({ x, y, dx, dy });
          lastInput = performance.now();
          start();
        }
      }
      lastPointer = { x, y };
    },
    pointerLeave() {
      lastPointer = null;
    },
    destroy() {
      cancelAnimationFrame(frame);
      show(false);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
