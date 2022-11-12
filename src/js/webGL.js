import React, { useRef, useEffect, useState, useContext } from "react";
import * as THREE from "three";
import fragment from "../components/gl/fragment";
import vertex from "../components/gl/vertex";
import { bgMesh } from "../js/Background";
import { motion, useAnimationControls } from "framer-motion";
import Navbar from "../components/navbar";
import gsap from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "../js/glitchPass.js";
import "../js/checkAnim";
import "../js/scroll";
import "../js/setBlurry";

let button = require("../images/button.webp");

let canvas, renderer, composer, glitchPass;
let camera, scene, bounds, camUnit;
let meshes = [];

const Window = () => {
  const windowRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [changed, setChanged] = useState(false);

  const variants = {
    initial: {
      clipPath: "polygon(0 100%, 0 100%, 0 100%, 0% 100%)",
      filter: "sepia(1) hue-rotate(0deg)",
      opacity: 0,
    },
    animate: {
      filter: [
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(90deg)",
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(40deg)",
        "sepia(1) hue-rotate(55deg)",
        "sepia(1) hue-rotate(85deg)",
        "sepia(1) hue-rotate(55deg)",
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(77deg)",
        "sepia(1) hue-rotate(42deg)",
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(95deg)",
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(57deg)",
        "sepia(1) hue-rotate(63deg)",
        "sepia(1) hue-rotate(55deg)",
        "sepia(1) hue-rotate(75deg)",
        "sepia(0) hue-rotate(0deg)",
      ],
      clipPath: [
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 26% 0, 100% 0, 100% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 23% 100%, 23% 33%, 100% 33%, 100% 100%, 25% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 0 100%, 0 25%, 100% 25%, 100% 75%, 0 75%, 0 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 25% 100%, 25% 0, 74% 0, 75% 100%, 26% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 400%, 400% 300%, 400% 0, -100% -100%)",
      ],
      opacity: 1,
    },
    exit: {
      clipPath: [
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 26% 0, 100% 0, 100% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 23% 100%, 23% 33%, 100% 33%, 100% 100%, 25% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 0 100%, 0 25%, 100% 25%, 100% 75%, 0 75%, 0 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 25% 100%, 25% 0, 74% 0, 75% 100%, 26% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
      ],
      opacity: 0,
    },
  };

  const controls = useAnimationControls();

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

  const setupScene = () => {
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
    // ------------------- loader start ---------------------
    // ********************************************************

    const loadingManager = new THREE.LoadingManager();

    loadingManager.onStart = function (item, loaded, total) {
      //console.log("Loading started");
      controls.start("animate");
    };

    loadingManager.onLoad = function () {
      //console.log("done!");
    };
    loadingManager.onProgress = function (item, loaded, total) {
      // console.log(item, loaded, total);
      // console.log('Loaded:', Math.round(loaded / total * 100, 2) + '%')
    };

    loadingManager.onError = function (url) {
      console.log("Error loading");
    };

    // ********************************************************
    // ------------------- make buttons start ---------------------
    // ********************************************************
    const elements = document.querySelectorAll(".btn");
    const loader = new THREE.TextureLoader(loadingManager);
    const texture = loader.load(button, (texture) => {
      elements.forEach(replace);
      function replace(el) {
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

            mesh.position.y -=
              ((top - y) / canvas.offsetHeight) * camUnit.height;
          }

          function updateX(x = 0) {
            const { left } = bounds;

            mesh.position.x = -(camUnit.width / 2) + mesh.scale.x / 2;
            mesh.position.x +=
              ((left + x) / canvas.offsetWidth) * camUnit.width;
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
      texture.needsUpdate = false;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = false;
    });

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

      document.getElementById(
        "data-scroll-content"
      ).style.transform = `translate3d(0, -${window.scrollProgress.current}px, 0)`;

      // bgMesh.material.uniforms.iTime.value = time;
      // bgMesh.material.uniforms.iProg.value = Math.abs(window.delta.speed);

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
      } else {
        glitchPass.enabled = false;
      }
    };

    animate();
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial={"initial"}
        animate={controls}
        exit={"exit"}
        className="canvas__wrapper"
        onAnimationStart={() => {}}
        onAnimationComplete={() => {
          setVisible(true);
        }}
        ref={windowRef}
      >
        <canvas id="c"></canvas>
      </motion.div>
      <Navbar />
    </>
  );
};

export { Window, meshes };
