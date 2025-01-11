import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { type ThreeElements } from '@react-three/fiber';

function PlusSignModel(props: ThreeElements['mesh']) {
  return (
    <mesh {...props}>
      {/* Vertical part of the plus sign */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ff6666"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      {/* Horizontal part of the plus sign */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ff6666"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} />
        <Suspense fallback={null}>
          <PlusSignModel />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
