import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { LinearFilter, RepeatWrapping } from "three";
import f from "../components/gl/f";
import v from "../components/gl/v";

export default class Button extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        iProg: { type: "f", value: 0 },
        iTime: { type: "f", value: 0.0 },
        iChannel0: {
          type: "t",
          value: undefined,
        },
      },
      vertexShader: v,
      fragmentShader: f,
    });
  }

  get texture() {
    return this.uniforms.iChannel0.value;
  }
  set texture(v) {
    this.uniforms.iChannel0.value = v;
  }
}

// register element in r3f (<image />)
extend({ Button });
