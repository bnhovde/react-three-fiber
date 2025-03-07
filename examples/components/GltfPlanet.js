import * as THREE from 'three'
import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useLoader, useFrame, useThree, extend } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import planet from 'file-loader!../resources/gltf/planet.gltf'

function Planet(props) {
  const group = useRef()
  const [, objects] = useLoader(GLTFLoader, planet, loader => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/public/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <group ref={group} {...props}>
      <scene name="OSG_Scene">
        <object3D name="RootNode_(gltf_orientation_matrix)" rotation={[-1.5707963267948963, 0, 0]}>
          <object3D name="RootNode_(model_correction_matrix)">
            <object3D name="Root">
              <object3D
                name="planet001"
                position={[-0.0032900000000000013, 0.023690000000000006, -6.33114]}
                rotation={[0.23801904073457583, -0.5453875094307201, 0.5622765917510457]}
                scale={[7.0000020953568285, 6.999997807471086, 6.999999297157107]}>
                <mesh name="planet001">
                  <bufferGeometry attach="geometry" {...objects[5].geometry} />
                  <meshStandardMaterial attach="material" {...objects[5].material} name="scene" roughness={1} />
                </mesh>
                <mesh name="planet001" receiveShadow castShadow>
                  <bufferGeometry attach="geometry" {...objects[6].geometry} />
                  <meshStandardMaterial attach="material" {...objects[6].material} name="scene" roughness={1} />
                </mesh>
              </object3D>
            </object3D>
          </object3D>
        </object3D>
      </scene>
    </group>
  )
}

extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 15] }} shadowMap>
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[-10, -25, -10]} color="red" />
      <spotLight
        castShadow
        intensity={4}
        angle={Math.PI / 6}
        position={[25, 25, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <fog attach="fog" args={['#cc7b32', 16, 20]} />
      <Suspense fallback={null}>
        <Planet />
      </Suspense>
      <Controls
        autoRotate
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.5}
        rotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
