import React, { useRef, useEffect, useState, createContext } from "react";
import * as THREE from "three";
import fragment from "../components/gl/fragment";
import vertex from "../components/gl/vertex";
import { bgMesh } from "../js/Background";
import { motion } from "framer-motion";
import gsap from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "../js/glitchPass.js";
import "../js/checkAnim";
import "../js/scroll";
import "../js/setBlurry";

let button = require("../images/button.png");

let canvas, renderer, composer, glitchPass;
let camera, scene, bounds, camUnit;
let meshes = [];

const Window = () => {
  const windowRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [changed, setChanged] = useState(false);

  const setupScene = () => {
    // window.setBlurry.is = false;
    // window.hoverItem.hovering = false;
    // renderer
    canvas = document.getElementById("c");

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    renderer.autoClear = false; // important!
    renderer.setClearColor(0xffffff, 0.0);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 50);

    scene.add(bgMesh);

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    glitchPass = new GlitchPass();
    glitchPass.enabled = false;
    composer.addPass(glitchPass);

    // ********************************************************
    // ------------------- make planes start ---------------------
    // ********************************************************
    const elements = document.querySelectorAll(".btn");
    const loader = new THREE.TextureLoader();
    const texture = loader.load(button, (texture) => {
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = false;
    });
    elements.forEach(replace);
    function replace(el, index) {
      if (typeof el != "undefined" && el != null) {
        // set up basic material and geometry

        const imgGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);

        const prog = {
          ress: 0,
        };

        const imgMaterial = new THREE.ShaderMaterial({
          uniforms: {
            iTime: { type: "f", value: prog },
            iChannel0: {
              type: "t",
              value: texture,
            },
          },
          fragmentShader: fragment,
          vertexShader: vertex,
        });

        const geometry = imgGeometry;
        const material = imgMaterial.clone();

        const mesh = new THREE.Mesh(geometry, material);

        // set the position of the gallery
        const corner = new THREE.Vector3(0, 0, 0);
        corner.unproject(camera);

        function setBounds() {
          const rect = el.getBoundingClientRect();

          bounds = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          };

          updateSize();
          updatePosition();
        }

        window.addEventListener("resize", onWindowResize);
        document.addEventListener("DOMContentLoaded", setBounds());

        function onWindowResize() {
          setBounds();
        }

        function calculateUnitSize(distance = mesh.position.z) {
          const vFov = (camera.fov * Math.PI) / 180;
          const height = 2 * Math.tan(vFov / 2) * distance;
          const width = height * (canvas.offsetWidth / canvas.offsetHeight);

          return { width, height };
        }

        function updateSize() {
          camUnit = calculateUnitSize(camera.position.z - mesh.position.z);

          const x = bounds.width / canvas.offsetWidth;
          const y = bounds.height / canvas.offsetHeight;

          if (!x || !y) return;

          mesh.scale.x = camUnit.width * x;
          mesh.scale.y = camUnit.height * y;
        }

        function updateY(y = 0) {
          const { top } = bounds;

          mesh.position.y = camUnit.height / 2 - mesh.scale.y / 2;

          mesh.position.y -= ((top - y) / canvas.offsetHeight) * camUnit.height;
        }

        function updateX(x = 0) {
          const { left } = bounds;

          mesh.position.x = -(camUnit.width / 2) + mesh.scale.x / 2;
          mesh.position.x += ((left + x) / canvas.offsetWidth) * camUnit.width;
        }

        function updatePosition(y) {
          updateY(y);
          updateX(0);
        }

        function setY() {
          const rect = el.getBoundingClientRect();

          bounds = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          };

          updateY();
        }

        setY();

        // scene.add(cube);
        meshes.push(mesh);
        scene.add(mesh);

        function animate(time) {
          time *= 0.001;
          mesh.material.uniforms.iTime.value = time * prog.ress;
          setY();
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        // Handle hovers...
        el.addEventListener("mouseenter", () => {
          gsap.to(prog, {
            ress: 1,
            ease: "power2.easeInOut",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(prog, {
            ress: 0,
            ease: "power2.easeInOut",
          });
        });
        // Exists.
      } else {
        return;
      }
    }

    if (changed === true) {
      meshes.forEach((el) => {
        el.geometry.dispose();
        el.material.dispose();
      });
    }

    // add function to make canvas adaptive
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    // ********************************************************
    // ------------------- make planes end -------------------
    // ********************************************************

    const animate = function (time) {
      time *= 0.001;

      glitchPass.curF = 20;

      bgMesh.material.uniforms.iTime.value = time;
      bgMesh.material.uniforms.iProg.value = Math.abs(window.delta.speed);

      //bgMesh.material.uniforms.iTime.value =
      //time * Math.abs(window.delta.speed);

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      requestAnimationFrame(animate);
      //renderer.render(scene, camera);
      composer.render(scene, camera);

      if (window.setBlurry.is === true || window.hoverItem.hovering === true) {
        glitchPass.enabled = true;
        if ((window.hoverItem.enabled = true)) {
          glitchPass.goWild = false;
        } else {
          glitchPass.goWild = true;
        }
      } else {
        glitchPass.enabled = false;
      }
    };

    animate();
  };

  useEffect(() => {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        setChanged(true);
        // console.log(mutation.type);
        if (visible === true) {
          setupScene();
        }
      });
    });

    var config = { attributes: false, childList: true, characterData: false };

    observer.observe(document.getElementById("data-scroll-content"), config);
    setupScene();
  });

  const transition = {
    duration: 1,
    //delay: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, transition }}
        animate={{ opacity: 1, transition }}
        exit={{ opacity: 0, transition }}
        onAnimationStart={() => {}}
        onAnimationComplete={() => {
          setVisible(true);
        }}
        ref={windowRef}
      >
        <canvas id="c"></canvas>
      </motion.div>
    </>
  );
};

export { Window };
