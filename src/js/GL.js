import React, {
  useRef,
  Suspense,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import { LinearMipmapLinearFilter, RepeatWrapping, Vector3 } from "three";
import { useScroll } from "framer-motion";
import Navbar from "../components/navbar";
import { Effects } from "@react-three/drei";
import {
  Glitch,
  Noise,
  EffectComposer,
  Scanline,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import { GlitchPass } from "./glitchPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

import { Html, useProgress, useTexture, useIntersect } from "@react-three/drei";
import "./image";
import useDOMChange from "./pageState";

const bg = require("../images/bg2.png");

extend({ GlitchPass, FilmPass });

const Button = ({ image }) => {
  const texture = useTexture(image.props.src);
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));

  const { viewport } = useThree();

  const { width, height, top, left } = image.props.getBoundingClientRect();

  const scroll = useScroll();

  //useFrame(() => ref.current.update);

  useMemo(() => {
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.needsUpdate = true;
  }, [
    texture.generateMipmaps,
    texture.wrapS,
    texture.wrapT,
    texture.minFilter,
    texture.needsUpdate,
  ]);

  const scaleX = (width / window.innerWidth) * viewport.width;
  const scaleY = (height / window.innerHeight) * viewport.height;
  const posX =
    ((width / window.innerWidth) * viewport.width) / 2 -
    viewport.width / 2 +
    (left / window.innerWidth) * viewport.width;
  const posY =
    0 -
    ((height / window.innerHeight) * viewport.height) / 2 +
    viewport.height / 2 -
    (top / window.innerHeight) * viewport.height;

  return (
    <mesh ref={ref} scale={[scaleX, scaleY, 1]} position={[posX, posY, 0]}>
      <planeGeometry attach="geometry" />
      <button attach="material" texture={texture} />
    </mesh>
  );
};

function Plane(props) {
  const texture = useTexture(props.img);
  useMemo(() => {
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.needsUpdate = true;
  }, [
    texture.generateMipmaps,
    texture.wrapS,
    texture.wrapT,
    texture.minFilter,
    texture.needsUpdate,
  ]);
  const { viewport } = useThree();
  const { width, height, top, left } = document
    .getElementById("canvasWrapper")
    .getBoundingClientRect();

  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Return view, these are regular three.js elements expressed in JSX
  // Subscribe this component to the render-loop, rotate the mesh every frame

  return (
    <mesh
      {...props}
      ref={mesh}
      // We convert the width and height to relative viewport units
      scale={[
        (width / window.innerWidth) * viewport.width,
        (height / window.innerHeight) * viewport.height,
        1,
      ]}
      // We convert the x and y positions to relative viewport units
      position={[
        ((width / window.innerWidth) * viewport.width) / 2 -
          viewport.width / 2 +
          (left / window.innerWidth) * viewport.width,
        0 -
          ((height / window.innerHeight) * viewport.height) / 2 +
          viewport.height / 2 -
          (top / window.innerHeight) * viewport.height,
        -10,
      ]}
    >
      <planeGeometry attach="geometry" args={[1, 1]} />
      {/* <meshBasicMaterial attach="material" map={texture} /> */}
      <button attach="material" texture={texture} />
    </mesh>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function GL(props) {
  const windowRef = useRef(null);
  // const state = useWebGLState();

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
  const state = useDOMChange();
  return (
    <>
      {/* <button
        style={{ position: "fixed", top: "2rem", left: "2rem", zIndex: "100" }}
        onClick={state.action}
      >
        Click ME
      </button> */}
      <div
        // variants={variants}
        // initial={"initial"}
        // animate={"animate"}
        // exit={"exit"}
        id="canvasWrapper"
        className="canvas__wrapper"
        // onAnimationStart={() => {}}
        // onAnimationComplete={() => {
        //   setVisible(true);
        // }}
        ref={windowRef}
      >
        <Canvas
          orthographic={true}
          gl={{
            alpha: false,
            antialias: false,
            stencil: false,
            depth: false,
          }}
        >
          <Suspense fallback={<Loader />}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Plane img={bg} />
            {/* {state.map((image, i) => (
              <Button key={image.props.src + i} image={image} />
            ))} */}
          </Suspense>
          <EffectComposer>
            <Glitch
              active={true}
              ratio={0.15}
              strength={[0.002, 0.005]}
              mode={GlitchMode.SPORADIC}
              delay={Math.random() * 2 + 1}
              duration={[0.1, 0.25]}
              dtSize={64}
            />
            <Scanline
              blendFunction={BlendFunction.OVERLAY}
              density={1.25}
              opacity={0.05}
            />
            <Noise opacity={0.02} />
          </EffectComposer>
        </Canvas>
      </div>
      <Navbar />
    </>
  );
}
