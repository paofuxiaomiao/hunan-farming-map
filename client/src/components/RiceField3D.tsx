/*
 * RiceField3D - Three.js 3D稻田场景
 * 白色发光背景 + 金色稻穗在风中摇曳
 * 稻穗集中在画面下半部分，上方留白给文字
 */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── 稻秆 ─── */
function RiceStalks({ count = 1800 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const stalksData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 22 - 2;
      const height = 0.6 + Math.random() * 1.0;
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.5;
      const swayAmount = 0.06 + Math.random() * 0.1;
      data.push({ x, z, height, phase, speed, swayAmount });
    }
    return data;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    stalksData.forEach((stalk, i) => {
      dummy.position.set(stalk.x, stalk.height * 0.5, stalk.z);
      dummy.scale.set(0.015, stalk.height, 0.015);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [stalksData, dummy]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    stalksData.forEach((stalk, i) => {
      // 风浪效果 - 基于位置的相位偏移
      const windWave = Math.sin(t * 0.4 + stalk.x * 0.25 + stalk.z * 0.15) * 0.04;
      const sway = Math.sin(t * stalk.speed + stalk.phase) * stalk.swayAmount;
      const sway2 = Math.sin(t * stalk.speed * 0.7 + stalk.phase * 1.3) * stalk.swayAmount * 0.4;
      dummy.position.set(stalk.x + (sway + windWave) * 0.25, stalk.height * 0.5, stalk.z);
      dummy.scale.set(0.015, stalk.height, 0.015);
      dummy.rotation.set(0, 0, sway + sway2 + windWave);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.4, 0.7, 1, 4]} />
      <meshStandardMaterial
        color="#c4a020"
        roughness={0.65}
        metalness={0.08}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

/* ─── 稻穗谷粒 ─── */
function RiceGrains({ count = 1800 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const grainsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 22 - 2;
      const height = 0.6 + Math.random() * 1.0;
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.5;
      const swayAmount = 0.06 + Math.random() * 0.1;
      data.push({ x, z, height, phase, speed, swayAmount });
    }
    return data;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    grainsData.forEach((grain, i) => {
      dummy.position.set(grain.x, grain.height + 0.1, grain.z);
      dummy.scale.set(0.035, 0.07, 0.035);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [grainsData, dummy]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    grainsData.forEach((grain, i) => {
      const windWave = Math.sin(t * 0.4 + grain.x * 0.25 + grain.z * 0.15) * 0.04;
      const sway = Math.sin(t * grain.speed + grain.phase) * grain.swayAmount;
      const sway2 = Math.sin(t * grain.speed * 0.7 + grain.phase * 1.3) * grain.swayAmount * 0.4;
      const totalSway = sway + sway2 + windWave;
      dummy.position.set(
        grain.x + totalSway * 0.6,
        grain.height + 0.1 - Math.abs(totalSway) * 0.15,
        grain.z
      );
      dummy.scale.set(0.035, 0.07, 0.035);
      dummy.rotation.set(totalSway * 0.4, 0, totalSway * 1.2);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshStandardMaterial
        color="#d4a017"
        roughness={0.4}
        metalness={0.15}
        transparent
        opacity={0.8}
        emissive="#d4a017"
        emissiveIntensity={0.12}
      />
    </instancedMesh>
  );
}

/* ─── 光粒子 ─── */
function GlowParticles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = Math.random() * 3.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = 0.001 + Math.random() * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];
      if (posArr[i * 3 + 1] > 5) {
        posArr[i * 3] = (Math.random() - 0.5) * 35;
        posArr[i * 3 + 1] = -0.5;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 18;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e8c547"
        size={0.035}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── 地面 ─── */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <planeGeometry args={[60, 35]} />
      <meshStandardMaterial
        color="#f0e8d0"
        roughness={0.95}
        metalness={0}
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

/* ─── 相机控制 ─── */
function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 3.2, 10);
    camera.lookAt(0, 0.8, -2);
  }, [camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.08) * 0.35;
    camera.position.y = 3.2 + Math.sin(t * 0.12) * 0.08;
    camera.lookAt(0, 0.8, -2);
  });

  return null;
}

/* ─── 主场景 ─── */
export default function RiceField3D({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`} style={{ background: "linear-gradient(180deg, #ffffff 0%, #fefcf5 25%, #faf5e8 65%, #f5edd5 100%)" }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.7,
        }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#fefcf5", 5, 28]} />
        <ambientLight intensity={1.9} color="#fffaf0" />
        <directionalLight
          position={[5, 8, 3]}
          intensity={2.6}
          color="#fff5e0"
          castShadow={false}
        />
        <directionalLight
          position={[-3, 5, -2]}
          intensity={0.7}
          color="#ffecd2"
        />
        <pointLight position={[0, 3, -6]} intensity={3.2} color="#fff8e7" distance={22} />
        <pointLight position={[0, 1, 6]} intensity={1.3} color="#ffe8b0" distance={16} />

        <CameraRig />
        <Ground />
        <RiceStalks count={1800} />
        <RiceGrains count={1800} />
        <GlowParticles count={150} />
      </Canvas>
    </div>
  );
}
