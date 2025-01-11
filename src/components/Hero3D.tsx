import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { type ThreeElements } from '@react-three/fiber';

function HeartModel(props: ThreeElements['mesh']) {
  return (
    <mesh {...props}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <HeartModel />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}