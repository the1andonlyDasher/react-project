import * as THREE from "three";
import "../js/scroll";
import "../js/hoverImg";

let images = [
  require("../images/bg3.png"),
  require("../images/page1.webp"),
  require("../images/page2.webp"),
  require("../images/page3.webp"),
];
const textures = [];

const fragment = `
varying vec2 vUv; 

uniform float iTime;
uniform sampler2D iChannel0;



float rand(vec2 p)
{
    float t = floor(iTime * 10.) / 10.;
    return fract(sin(dot(p, vec2(t * 12.9898, t * 78.233))) * 43758.5453);
}

float noise(vec2 uv, float blockiness)
{   
    vec2 lv = fract(uv);
    vec2 id = floor(uv);
    
    float n1 = rand(id);
    float n2 = rand(id+vec2(1,0));
    float n3 = rand(id+vec2(0,1));
    float n4 = rand(id+vec2(1,1));
    
    vec2 u = smoothstep(0.0, 1.0 + blockiness, lv);

    return mix(mix(n1, n2, u.x), mix(n3, n4, u.x), u.y);
}

float fbm(vec2 uv, int count, float blockiness, float complexity)
{
    float val = 0.01;
    float amp = 0.3;
    
    while(count != 0)
    {
      val += amp * noise(uv, blockiness);
        amp *= 0.5;
        uv *= complexity;    
        count--;
    }
    
    return val;
}

const float glitchAmplitude = 0.2; // increase this
const float glitchNarrowness = 10.0;
const float glitchBlockiness = 2.0;
const float glitchMinimizer = 3.0; // decrease this

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = -1.0 + 1.0 *vUv;
    vec2 a = vec2(uv.x * (uv.x / uv.y), uv.y);
    vec2 uv2 = vec2(a.x / a.x, exp(a.y));
    vec2 id = floor(uv * 1.0);
    id.x /= floor(texture(iChannel0, vec2(id / 8.0)).r * 8.0);

    // Generate shift amplitude
    float shift = glitchAmplitude * pow(fbm(uv2, int(rand(id) * 6.), glitchBlockiness, glitchNarrowness), glitchMinimizer);
    
    // Create a scanline effect
    float scanline = abs(cos(uv.y * 1.));
    scanline = smoothstep(0.1, 0.0, scanline);
    shift = smoothstep(0.00001, 0.2, shift);
    
    // Apply glitch and RGB shift
    float colR = texture(iChannel0, vec2(uv.x + shift, uv.y)).r * (1. - shift) ;
    float colG = texture(iChannel0, vec2(uv.x - shift, uv.y)).g * (1. - shift) + rand(id) * shift;
    float colB = texture(iChannel0, vec2(uv.x - shift, uv.y)).b * (1. - shift);
    // Mix with the scanline effect
    vec3 f = vec3(colR * 0.2, colG, colB) - (0.9 * scanline);
    
    // Output to screen
    gl_FragColor = vec4(f, -1.0);
}`;

const vertex = `varying vec2 vUv; 
void main()
{
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}`;

const f = `
varying vec2 vUv; 
uniform sampler2D iChannel0;
uniform float iTime;
uniform float iProg;



float density = 0.9;
float opacityScanline = .1;
float opacityNoise = 0.2;
float flickering = 0.1;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float blend(const in float x, const in float y) {
  return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));
}

vec3 blend(const in vec3 x, const in vec3 y, const in float opacity) {
  vec3 z = vec3(blend(x.r, y.r), blend(x.g, y.g), blend(x.b, y.b));
  return z * opacity + x * (1.0 - opacity);
}

void main( )
{
    vec2 uv = -1.0 + 1.0 *vUv;
    vec3 col = texture(	iChannel0,uv).rgb;
    
    float count = uv.y * density * iProg;
    vec2 sl = vec2(sin(uv.y * count), cos(uv.y * count) + (iProg * 0.05));
    vec3 scanlines = vec3(sl.x, sl.y, sl.x) ;

    col += col * (scanlines) * opacityScanline * (0.015 * iProg) ;
    col += col * vec3(random(uv*iTime)) * opacityNoise * (0.05 * iProg) ;
    col += col * sin(110.0*iTime) * flickering * (0.015 * iProg) ;


    gl_FragColor = vec4(col,1);
}`;

const v = `varying vec2 vUv; 
void main()
{
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}`;

var i = 0;
var counter = 5;
while (i < counter) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(images[i], (texture) => {
    texture.needsUpdate = false;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.needsUpdate = true;
  });
  textures.push(texture);
  i += 1;
}
const bgGeometry = new THREE.PlaneGeometry(120, 80, 1, 1);

const bgMaterial = new THREE.ShaderMaterial({
  uniforms: {
    iProg: { type: "f", value: 0 },
    iTime: { type: "f", value: 0.0 },
    iChannel0: {
      type: "t",
      value: textures[0],
    },
  },
  fragmentShader: f,
  vertexShader: v,
});

const imgMaterial = new THREE.ShaderMaterial({
  opacity: 1,
  uniforms: {
    iTime: { type: "f", value: 0 },
    iChannel0: {
      type: "t",
      value: textures[0],
    },
  },
  fragmentShader: fragment,
  vertexShader: vertex,
});

const g = bgGeometry;
const m = bgMaterial;
m.needsUpdate = false;

const bgMesh = new THREE.Mesh(g, m);

bgMesh.position.z = -10;

function animate(time) {
  time *= 0.001;

  bgMesh.material.uniforms.iChannel0.value =
    textures[`${window.hoverItem.hoverImg}`];

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
export { bgMesh };
