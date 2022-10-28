import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import gsap from "gsap";

let uniforms;
var prog = {
  ress: 0.5,
};

const f = `
varying vec2 vUv; 
uniform sampler2D iChannel0;
uniform float iTime;

float rand () {
  return fract(sin(iTime)*1e4);
}
void main()
{
  vec2 uv = -.0 + .6 * vUv;

  vec2 uvR = uv;
  vec2 uvB = uv;

  uvR.x = uv.x * 1.0 + rand() * 0.02 * 0.8;
  uvB.y = uv.y * 1.0 + rand() * 0.02 * 0.8;
  
  // 
  if(uv.y < rand() && uv.y > rand() -0.1 && sin(iTime) < 0.0)
  {
    uv.x = (uv + 0.02 * rand()).x;
  }
  
  //
  vec4 c;
  c.r = texture(iChannel0, uvR).r;
  c.g = texture(iChannel0, uv).g;
  c.b = texture(iChannel0, uvB).b;

  //
  float scanline = sin( uv.y * 800.0 * rand())/30.0; 
c *= 1.0 - scanline; 
  
  //vignette
  float vegDist = length(( 0.5 , 0.5 ) - uv);
  c *= 1.0 - vegDist * 0.6;

  gl_FragColor = c;
}`;

const v = `varying vec2 vUv; 
void main()
{
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}`;

var i = 0,
  radius = 30,
  counter = 5;
let planes = [];
let coneRotation;
let cParams = { rotation: (Math.PI / 10) * 3 };

const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    camera.position.set(0, 0, 35);
    controls.target.set(0, 0, 0);
    controls.minDistance = 3;
    controls.maxDistance = 200;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const Plane = () => {
  coneRotation = coneRotation === undefined ? Math.PI / 6 : coneRotation;
  let position = [];

  while (i < counter) {
    const urls = [
      "./images/lime1.jpg",
      "./images/herbs1.jpg",
      "./images/blue1.jpg",
      "./images/water1.jpg",
      "./images/rasp1.jpg",
    ];

    const colorMap = new THREE.TextureLoader();
    const noise = new THREE.TextureLoader().load("./images/noise.png");
    const textures = colorMap.load(urls[i], (texture) => {
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
    });
    uniforms = {
      iTime: { type: "f", value: prog.ress },
      iChannel0: {
        type: "t",
        value: textures,
      },
    };
    var r = ((Math.PI * 2) / counter) * i;
    // set position of mesh
    position = [Math.cos(r) * radius, 0, Math.sin(r) * radius];

    // add mesh to the group
    planes.push(
      <mesh
        key={i}
        rotation={[0, -(Math.PI * 2 * i) / counter + Math.PI / 2, 0]}
        position={position}
      >
        <planeBufferGeometry attach="geometry" args={[20 / 3, 20 / 4]} />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          uniformsNeedUpdate={true}
          fragmentShader={f}
          vertexShader={v}
          // color={colorsArray[i]}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
    i += 1;
  }
  function render(time) {
    time += 0.01;
    uniforms.iTime.value = time;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};

Plane();

const Carousel = () => {
  const c = useRef();

  useFrame((state, delta) => {
    c.current.rotation.y = cParams.rotation;
  });
  return (
    <>
      <group position={[0, 0, 0]} rotation={[0, cParams.rotation, 0]} ref={c}>
        {planes}
      </group>
    </>
  );
};

const CC = () => {
  const next = useRef();
  const prev = useRef();
  // set up carousel buttons
  function Right(e) {
    const oldR = cParams.rotation;
    const newR = oldR + (Math.PI / 10) * 4;
    const tween = gsap.to(cParams, {
      rotation: newR,
      duration: 1.5,
      ease: "power2.out",
    });
    tween.play();
    e.target.disabled = true;
    document.getElementById("prev").disabled = true;
    setTimeout(function () {
      // console.log("enabled");
      e.target.disabled = false;
      document.getElementById("prev").disabled = false;
    }, 1500);
    // console.log(cParams.rotation);
  }

  function Left(e) {
    const oldR = cParams.rotation;
    const newR = oldR - (Math.PI / 10) * 4;
    const tween = gsap.to(cParams, {
      rotation: newR,
      duration: 1.5,
      ease: "power2.out",
    });
    tween.play();
    e.target.disabled = true;
    document.getElementById("next").disabled = true;
    setTimeout(function () {
      // console.log("enabled");
      e.target.disabled = false;
      document.getElementById("next").disabled = false;
    }, 1500);
    // console.log(cParams.rotation);
  }

  return (
    <>
      <Canvas>
        <CameraController />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Carousel />
      </Canvas>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <button id="prev" ref={prev} onClick={Left} className="btn__outline">
          Left
        </button>
        <button id="next" ref={next} onClick={Right} className="btn__outline">
          Right
        </button>
      </div>
    </>
  );
};

export const Portfolio = ({ title, subtitle, sectionName, id }) => {
  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <h2 data-before={title}>{title}</h2>
        <h3>{subtitle}</h3>
        <div className="carousel">
          <CC />
        </div>
      </section>
    </>
  );
};

console.log(planes);
