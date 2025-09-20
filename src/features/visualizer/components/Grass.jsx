// 更新simplex-noise的导入方式，新版本使用命名导出
import { useMemo, useRef } from "react"
import { createNoise2D } from "simplex-noise"
import * as THREE from "three"
import { useFrame, useLoader } from "@react-three/fiber"

// 这些纹理来自 "Realistic real-time grass rendering" by Eddie Lee, 2010
import bladeAlpha from "/textures/grass/blade_alpha.jpg"
import bladeDiffuse from "/textures/grass/blade_diffuse.jpg"
import { Sky } from "@react-three/drei"

// 创建Simplex Noise实例的新方式
const noise2D = createNoise2D()

const defaultBladeOptions = {
  width: 0.12,
  height: 1,
  joints: 5,
}

// 将着色器代码移出组件，避免每次渲染重新创建
const getVertexSource = (height) => `
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
in vec3 position;
in vec3 offset;
in vec2 uv;
in vec4 orientation;
in float halfRootAngleSin;
in float halfRootAngleCos;
in float stretch;
uniform float time;
out vec2 vUv;
out float frc;

//WEBGL-NOISE FROM https://github.com/stegu/webgl-noise

//Description : Array and textureless GLSL 2D simplex noise function. Author : Ian McEwan, Ashima Arts. Maintainer : stegu Lastmod : 20110822 (ijm) License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file. https://github.com/ashima/webgl-noise https://github.com/stegu/webgl-noise

vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} 
vec2 mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} 
vec3 permute(vec3 x) {return mod289(((x*34.0)+1.0)*x);} 
float snoise(vec2 v){const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439); vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v -   i + dot(i, C.xx); vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0); vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i); vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 )); vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m ; m = m*m ; vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ); vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);}
//END NOISE

//https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
vec3 rotateVectorByQuaternion( vec3 v, vec4 q){
  return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
}

//https://en.wikipedia.org/wiki/Slerp
vec4 slerp(vec4 v0, vec4 v1, float t) {
  // Only unit quaternions are valid rotations.
  // Normalize to avoid undefined behavior.
  normalize(v0);
  normalize(v1);

  // Compute the cosine of the angle between the two vectors.
  float dot_ = dot(v0, v1);

  // If the dot product is negative, slerp won't take
  // the shorter path. Note that v1 and -v1 are equivalent when
  // the negation is applied to all four components. Fix by 
  // reversing one quaternion.
  if (dot_ < 0.0) {
    v1 = -v1;
    dot_ = -dot_;
  }  

  const float DOT_THRESHOLD = 0.9995;
  if (dot_ > DOT_THRESHOLD) {
    // If the inputs are too close for comfort, linearly interpolate
    // and normalize the result.

    vec4 result = t*(v1 - v0) + v0;
    normalize(result);
    return result;
  }

  // Since dot is in range [0, DOT_THRESHOLD], acos is safe
  float theta_0 = acos(dot_);       // theta_0 = angle between input vectors
  float theta = theta_0*t;          // theta = angle between v0 and result
  float sin_theta = sin(theta);     // compute this value only once
  float sin_theta_0 = sin(theta_0); // compute this value only once

  float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)
  float s1 = sin_theta / sin_theta_0;

  return (s0 * v0) + (s1 * v1);
}

void main() {
  //Relative position of vertex along the mesh Y direction
  frc = position.y / ${height.toFixed(1)};

  //Get wind data from simplex noise 
  float noise = 1.0 - (snoise(vec2((time - offset.x/50.0), (time - offset.z/50.0)))); 

  //Define the direction of an unbent blade of grass rotated around the Y axis
  vec4 direction = vec4(0.0, halfRootAngleSin, 0.0, halfRootAngleCos);

  //Interpolate between the unbent direction and the direction of growth calculated on the CPU. 
  //Using the relative location of the vertex along the Y axis as the weight, we get a smooth bend
  direction = slerp(direction, orientation, frc);
  vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);
  vPosition = rotateVectorByQuaternion(vPosition, direction);

  //Apply wind
  float halfAngle = noise * 0.15;
  vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));

  //UV for texture
  vUv = uv;

  //Calculate final position of the vertex from the world offset and the above shenanigans 
  gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + vPosition, 1.0);
}
`

const fragmentSource = `
precision highp float;
uniform sampler2D map;
uniform sampler2D alphaMap;
in vec2 vUv;
in float frc;
out vec4 fragColor;

void main() {
  //Get transparency information from alpha map
  float alpha = texture(alphaMap, vUv).r;
  //If transparent, don't draw
  if(alpha < 0.15) {
    discard;
  }
  //Get colour data from texture
  vec4 col = vec4(texture(map, vUv));
  //Add more green towards root
  col = mix(vec4(0.0, 0.6, 0.0, 1.0), col, frc);
  //Add a shadow towards root
  col = mix(vec4(0.0, 0.1, 0.0, 1.0), col, frc);
  fragColor = col;
}
`

export default function Grass({ bladeOptions = defaultBladeOptions, width = 100, instances = 50000 }) {
  const materialRef = useRef()
  const groundRef = useRef()
  const groupRef = useRef() // 添加group引用
  const [texture, alphaMap] = useLoader(THREE.TextureLoader, [bladeDiffuse, bladeAlpha])

  const attributeData = useMemo(() => getAttributeData(instances, width), [instances, width])

  const baseGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(bladeOptions.width, bladeOptions.height, 1, bladeOptions.joints)
    geo.translate(0, bladeOptions.height / 2, 0)
    return geo
  }, [bladeOptions])

  const groundGeo = useMemo(() => {
    const groundGeometry = new THREE.PlaneGeometry(width, width, 32, 32)
    const positions = groundGeometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] = getYPosition(positions[i], positions[i + 2])
    }
    groundGeometry.attributes.position.needsUpdate = true
    groundGeometry.computeVertexNormals()
    groundGeometry.lookAt(new THREE.Vector3(0, 1, 0))
    return groundGeometry
  }, [width])

  useFrame(state => {
    materialRef.current.uniforms.time.value = state.clock.elapsedTime / 4
    
    // 添加缓慢旋转效果
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 // 调整这个值可以改变旋转速度
    }
  })

  return (
    <>
      <group ref={groupRef}> {/* 将group添加引用 */}
        <mesh>
          <instancedBufferGeometry
            attach='geometry'
            index={baseGeometry.index}
            attributes-position={baseGeometry.attributes.position}
            attributes-uv={baseGeometry.attributes.uv}
            >
            <instancedBufferAttribute attach='attributes-offset' args={[new Float32Array(attributeData.offsets), 3]} />
            <instancedBufferAttribute attach='attributes-orientation' args={[new Float32Array(attributeData.orientations), 4]} />
            <instancedBufferAttribute attach='attributes-stretch' args={[new Float32Array(attributeData.stretches), 1]} />
            <instancedBufferAttribute attach='attributes-halfRootAngleSin' args={[new Float32Array(attributeData.halfRootAngleSin), 1]} />
            <instancedBufferAttribute attach='attributes-halfRootAngleCos' args={[new Float32Array(attributeData.halfRootAngleCos), 1]} />
          </instancedBufferGeometry>
          <rawShaderMaterial
            attach='material'
            ref={materialRef}
            glslVersion={THREE.GLSL3}
            uniforms={{
                map: { value: texture },
                alphaMap: { value: alphaMap },
                time: { value: 0 },
              }}
            vertexShader={getVertexSource(bladeOptions.height)}
            fragmentShader={fragmentSource}
            side={THREE.DoubleSide}
            />
        </mesh>
        <mesh position={[0, 0, 0]} geometry={groundGeo} ref={groundRef}>
          <meshStandardMaterial attach='material' color='#000f00' />
        </mesh>
      </group>
    </>
  )
}

function getAttributeData(instances, width) {
  const offsets = []
  const orientations = []
  const stretches = []
  const halfRootAngleSin = []
  const halfRootAngleCos = []

  let quaternion_0 = new THREE.Quaternion()
  let quaternion_1 = new THREE.Quaternion()

  // 生长方向的最小和最大角度（弧度）
  const min = -0.25
  const max = 0.25

  for (let i = 0; i < instances; i++) {
    const offsetX = Math.random() * width - width / 2
    const offsetZ = Math.random() * width - width / 2
    const offsetY = getYPosition(offsetX, offsetZ)
    offsets.push(offsetX, offsetY, offsetZ)

    let angle = Math.PI - Math.random() * (2 * Math.PI)
    halfRootAngleSin.push(Math.sin(0.5 * angle))
    halfRootAngleCos.push(Math.cos(0.5 * angle))

    // 使用Three.js的Quaternion类进行旋转操作
    quaternion_0.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle)

    angle = Math.random() * (max - min) + min
    quaternion_1.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle)
    quaternion_0.multiply(quaternion_1)

    angle = Math.random() * (max - min) + min
    quaternion_1.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle)
    quaternion_0.multiply(quaternion_1)

    orientations.push(quaternion_0.x, quaternion_0.y, quaternion_0.z, quaternion_0.w)

    if (i < instances / 3) {
      stretches.push(Math.random() * 1.8)
    } else {
      stretches.push(Math.random())
    }
  }

  return {
    offsets,
    orientations,
    stretches,
    halfRootAngleCos,
    halfRootAngleSin,
  }
}

function getYPosition(x, z) {
  let y = 2 * noise2D(x / 50, z / 50)
  y += 4 * noise2D(x / 100, z / 100)
  y += 0.2 * noise2D(x / 10, z / 10)
  return y
}