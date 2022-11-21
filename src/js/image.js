import * as THREE from "three";
import { extend, Color } from "@react-three/fiber";
import f from "../components/gl/gradient_f";
import v from "../components/gl/v";

export default class Button extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        iProg: { type: "f", value: 0 },
        iTime: { type: "f", value: 0.0 },
        uColorA: { value: new THREE.Color(0x000000) },
        uColorB: { value: new THREE.Color(0x222222) },
      },
      vertexShader: v,
      fragmentShader: f,
    });
  }
}

// register element in r3f (<buton />)
extend({ Button });
