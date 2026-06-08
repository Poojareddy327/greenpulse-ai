import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D, Center } from '@react-three/drei'

function CO2Molecule({ position }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Carbon atom (center) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#1F1F1F" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Oxygen atom 1 */}
      <mesh position={[-0.6, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#EF4444" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Oxygen atom 2 */}
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#EF4444" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Bonds */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    </group>
  )
}

function FloatingText({ text, position }) {
  return (
    <Center position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial color="#22C55E" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  )
}

const CarbonVisualization = ({ carbonAmount = 180 }) => {
  return (
    <div className="w-full h-[500px] bg-bgDark/50 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#14B8A6" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#22C55E" />

        <CO2Molecule position={[0, 0, 0]} />
        
        {/* Particles representing carbon emissions */}
        {Array.from({ length: Math.min(carbonAmount / 10, 30) }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2
          const radius = 2 + Math.sin(i) * 0.5
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(i * 0.5) * 1,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial 
                color={i % 3 === 0 ? "#22C55E" : i % 3 === 1 ? "#14B8A6" : "#10B981"} 
                emissive={i % 3 === 0 ? "#22C55E" : i % 3 === 1 ? "#14B8A6" : "#10B981"}
                emissiveIntensity={0.5}
              />
            </mesh>
          )
        })}

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center bg-bgDark/80 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div className="text-2xl font-bold text-primary">{carbonAmount} kg</div>
        <div className="text-sm text-textLight/60">CO₂ Emissions</div>
      </div>
    </div>
  )
}

export default CarbonVisualization
