import * as THREE from 'three';
import { THEMES } from '../theme';

function noise(x, y, z, t) {
  return (
    Math.sin(x * 1.4 + t * 0.7) * Math.cos(y * 1.15 - t * 0.5) * 0.5 +
    Math.sin(y * 2.1 + t * 0.42) * Math.cos(z * 1.7 + t * 0.6) * 0.28 +
    Math.sin(z * 2.7 - t * 0.85) * 0.16
  );
}

// Deforms an icosahedron into an abstract heart silhouette: two gaussian
// lobes on top, a cleft between them, and a pinched, rounded point below.
function shapeIntoHeart(geo) {
  const a = geo.attributes.position.array;
  const v = new THREE.Vector3();
  for (let i = 0; i < a.length; i += 3) {
    v.set(a[i], a[i + 1], a[i + 2]);
    const n = v.clone().normalize();
    const y = n.y;
    const x = n.x;
    const z = n.z;
    const g = (dx, dy, sx, sy) => Math.exp(-Math.pow((x - dx) / sx, 2) - Math.pow((y - dy) / sy, 2));
    const lobes = 1 + 0.42 * g(0.46, 0.38, 0.42, 0.4) + 0.42 * g(-0.46, 0.38, 0.42, 0.4);
    const cleft = 1 - 0.46 * Math.exp(-Math.pow(x / 0.26, 2)) * Math.exp(-Math.pow((y - 0.82) / 0.3, 2));
    const flat = 1 - 0.26 * Math.pow(Math.abs(z), 2);
    const k = lobes * cleft * flat;
    const d = Math.max(0, -y);
    const pinch = 1 - 0.88 * Math.pow(d, 1.05);
    const drop = 1 + 0.1 * Math.pow(d, 2.2);
    a[i] = v.x * k * pinch;
    a[i + 1] = (v.y * k + 0.34) * (y < 0 ? drop : 1);
    a[i + 2] = v.z * k * pinch;
  }
  geo.computeVertexNormals();
}

export class HeartScene {
  constructor(canvas, themeKey) {
    this.canvas = canvas;
    this.themeKey = themeKey;
    this.entered = false;
    this.small = window.innerWidth < 820;
    this.pointer = { x: 0, y: 0 };
    this.pointerTarget = { x: 0, y: 0 };
    this._v = new THREE.Vector3();
    this._build();
    this.resize();
    this._loop = this._loop.bind(this);
    this.raf = requestAnimationFrame(this._loop);
  }

  _build() {
    const th = THEMES[this.themeKey];
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    camera.position.set(0, 0, 9.5);
    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.IcosahedronGeometry(2.05, window.innerWidth < 700 ? 4 : 6);
    shapeIntoHeart(geo);
    const base = geo.attributes.position.array.slice();
    const mat = new THREE.MeshPhysicalMaterial({
      color: th.c1,
      roughness: 0.16,
      metalness: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      emissive: th.c3,
      emissiveIntensity: 0.55,
    });
    const blob = new THREE.Mesh(geo, mat);
    group.add(blob);

    const skin = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.9, 3),
      new THREE.MeshPhysicalMaterial({
        color: th.c2,
        transparent: true,
        opacity: 0.07,
        roughness: 0,
        metalness: 0,
        transmission: 0.6,
        side: THREE.DoubleSide,
      })
    );
    group.add(skin);

    const orbs = [];
    for (let i = 0; i < 9; i++) {
      const r = 0.14 + Math.random() * 0.34;
      const color = i % 3 === 0 ? th.c2 : th.c1;
      const om = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.1,
        metalness: 0.2,
        clearcoat: 1,
        emissive: color,
        emissiveIntensity: 0.45,
      });
      const o = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 3), om);
      group.add(o);
      orbs.push({
        o,
        rad: 3.1 + Math.random() * 2.3,
        a: Math.random() * 6.28,
        s: 0.1 + Math.random() * 0.26,
        y: (Math.random() - 0.5) * 3,
        ys: 0.35 + Math.random() * 0.9,
        ph: Math.random() * 6.28,
      });
    }

    const N = 520;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 6 + Math.random() * 10;
      const t2 = Math.random() * 6.28;
      const p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t2);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t2) * 0.65;
      pos[i * 3 + 2] = r * Math.cos(p);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: th.c2, size: 0.05, transparent: true, opacity: 0.5 }));
    scene.add(dust);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const k = new THREE.PointLight(th.c1, 3.4, 45);
    k.position.set(4.5, 4, 6);
    scene.add(k);
    const f = new THREE.PointLight(th.c2, 2.4, 45);
    f.position.set(-5.5, -3, 3.5);
    scene.add(f);
    const rim = new THREE.PointLight(0xffffff, 1.2, 35);
    rim.position.set(0, 3.5, -6.5);
    scene.add(rim);

    Object.assign(this, { renderer, scene, camera, group, blob, skin, orbs, dust, base, geo, mat, lights: { k, f } });
    this.clock = new THREE.Clock();
  }

  resize() {
    const cv = this.canvas;
    const w = cv.clientWidth || window.innerWidth;
    const h = cv.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.small = w < 820;
  }

  setPointerTarget(x, y) {
    this.pointerTarget.x = x;
    this.pointerTarget.y = y;
  }

  setEntered(v) {
    this.entered = v;
  }

  setTheme(key) {
    this.themeKey = key;
    const th = THEMES[key];
    this.mat.color.setHex(th.c1);
    this.mat.emissive.setHex(th.c3);
    this.skin.material.color.setHex(th.c2);
    this.orbs.forEach((p, i) => {
      const c = i % 3 === 0 ? th.c2 : th.c1;
      p.o.material.color.setHex(c);
      p.o.material.emissive.setHex(c);
    });
    this.dust.material.color.setHex(th.c2);
    this.lights.k.color.setHex(th.c1);
    this.lights.f.color.setHex(th.c2);
  }

  _loop() {
    this.raf = requestAnimationFrame(this._loop);
    const time = this.clock.getElapsedTime();
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * 0.05;
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * 0.05;

    const { geo, base, blob, skin, orbs, dust, group, camera, renderer, scene } = this;
    const arr = geo.attributes.position.array;
    const beat =
      Math.pow(Math.max(0, Math.sin(time * 1.5)), 8) * 0.055 +
      Math.pow(Math.max(0, Math.sin(time * 1.5 - 0.42)), 10) * 0.03;
    const bs = 1 + beat;
    blob.scale.set(bs, bs, bs);
    const amp = 0.2 + Math.sin(time * 0.35) * 0.05 + Math.abs(this.pointer.x) * 0.08;
    const v = this._v;
    for (let i = 0; i < arr.length; i += 3) {
      v.set(base[i], base[i + 1], base[i + 2]);
      const n = noise(base[i], base[i + 1], base[i + 2], time);
      const l = 1 + (n * amp) / 2.05;
      arr[i] = v.x * l;
      arr[i + 1] = v.y * l;
      arr[i + 2] = v.z * l;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();

    const en = this.entered;
    const drift = Math.sin(time * 0.22) * (en ? 1.5 : 2.6) + this.pointer.x * (en ? 1.4 : 2.9);
    const gx = (en ? (this.small ? 0 : 3.5) : 0) + drift;
    const gy = (en ? (this.small ? 2.4 : 0.3) : 0) + Math.sin(time * 0.31) * 0.45;
    const gs = en ? (this.small ? 0.32 : 0.6) : 1;
    group.position.x += (gx - group.position.x) * 0.045;
    group.position.y += (gy - group.position.y) * 0.045;
    const cs = group.scale.x + (gs - group.scale.x) * 0.045;
    group.scale.set(cs, cs, cs);

    const sway = Math.sin(time * 0.24) * 0.2 + this.pointer.x * 0.16;
    group.rotation.y += (sway - group.rotation.y) * 0.03;
    group.rotation.x += (this.pointer.y * 0.3 - group.rotation.x) * 0.04;
    skin.rotation.y -= dt * 0.1;
    skin.rotation.x += dt * 0.05;
    const ss = 1 + Math.sin(time * 0.6) * 0.03;
    skin.scale.set(ss, ss, ss);
    orbs.forEach((p) => {
      p.a += dt * p.s;
      const wide = p.rad * (1.35 + Math.sin(time * 0.26 + p.ph) * 0.5);
      p.o.position.set(Math.cos(p.a) * wide, p.y + Math.sin(time * p.ys + p.ph) * 0.5, Math.sin(p.a) * p.rad);
      p.o.rotation.y += dt * 0.6;
    });
    dust.rotation.y += dt * 0.018;
    dust.rotation.x = this.pointer.y * 0.05;
    camera.position.x += ((en ? 0 : this.pointer.x * 0.9) - camera.position.x) * 0.04;
    camera.position.y += ((en ? 0 : -this.pointer.y * 0.7) - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.renderer.dispose();
    this.geo.dispose();
    this.mat.dispose();
    this.skin.geometry.dispose();
    this.skin.material.dispose();
    this.orbs.forEach((p) => {
      p.o.geometry.dispose();
      p.o.material.dispose();
    });
    this.dust.geometry.dispose();
    this.dust.material.dispose();
  }
}
