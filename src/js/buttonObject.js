import React, { useRef, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { LinearFilter, ClampToEdgeWrapping } from "three";

import { useTexture } from "@react-three/drei";

export const Button = ({ image }) => {
  const mesh = useRef();
  const texture = useTexture(image.props.src);

  const { viewport } = useThree();

  useMemo(() => {
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
    texture.minFilter = LinearFilter;
    texture.needsUpdate = true;
  }, [
    texture.generateMipmaps,
    texture.wrapS,
    texture.wrapT,
    texture.minFilter,
    texture.needsUpdate,
  ]);

  const { width, height, top, left } = image.props.getBoundingClientRect();

  return (
    <mesh
      ref={mesh}
      scale={[
        (width / window.innerWidth) * viewport.width,
        (height / window.innerHeight) * viewport.height,
        1,
      ]}
      position={[
        ((width / window.innerWidth) * viewport.width) / 2 -
          viewport.width / 2 +
          (left / window.innerWidth) * viewport.width,
        0 -
          ((height / window.innerHeight) * viewport.height) / 2 +
          viewport.height / 2 -
          (top / window.innerHeight) * viewport.height,
        -5,
      ]}
    >
      <planeGeometry attach="geometry" />
      <button attach="material" texture={texture} />
    </mesh>
  );
};
