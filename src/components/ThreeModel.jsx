import React, { useRef, Suspense, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const DigitalGlobe = ({ scrollProgress }) => {
    const pointsRef = useRef();
    const coreRef = useRef();
    const ringsRef = useRef([]);

    // Generate points on a sphere surface for a digital globe look
    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            pos[i * 3] = Math.cos(theta) * Math.sin(phi) * 2;
            pos[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 2;
            pos[i * 3 + 2] = Math.cos(phi) * 2;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Base rotation + Scroll influence
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05 + scrollProgress * 5;
            pointsRef.current.rotation.x = time * 0.02 + scrollProgress * 2;
        }

        // Animate rings with scroll influence
        ringsRef.current.forEach((ring, i) => {
            if (ring) {
                ring.rotation.z = time * 0.1 + scrollProgress * (3 + i);
                ring.rotation.x = scrollProgress * 2;
            }
        });

        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(time) * 0.03);
            coreRef.current.position.y = Math.sin(time * 0.5) * 0.2;
        }
    });

    return (
        <group scale={1.8}>
            {/* The Digital Point Globe */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* The Glowing Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial
                    color="#bc13fe"
                    emissive="#bc13fe"
                    emissiveIntensity={3}
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Orbital Rings */}
            {[...Array(3)].map((_, i) => (
                <mesh
                    key={i}
                    ref={el => ringsRef.current[i] = el}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                >
                    <torusGeometry args={[2.3 + i * 0.15, 0.008, 16, 100]} />
                    <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} transparent opacity={0.15} />
                </mesh>
            ))}

            {/* Data Stars */}
            <Points count={400}>
                <PointMaterial transparent color="#fff" size={0.01} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
};

const ThreeModel = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 0.5
        }}>
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#00f3ff" />

                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                        <DigitalGlobe scrollProgress={scrollProgress} />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ThreeModel
