import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_CONFIG } from '../../constants';

// Floating 3D object component
function FloatingObject({ position, geometry, color, rotationSpeed, floatSpeed }) {
    const meshRef = useRef();
    const initialY = position[1];

    useFrame((state) => {
        if (meshRef.current) {
            // Rotation animation
            meshRef.current.rotation.x += rotationSpeed;
            meshRef.current.rotation.y += rotationSpeed * 0.7;

            // Float animation (sinusoidal)
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = initialY + Math.sin(time * floatSpeed) * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            {geometry}
            <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

// Main 3D Scene component
function Scene3DContent({ mousePosition }) {
    const cameraRef = useRef();

    // Generate random floating objects
    const objects = useMemo(() => {
        const objectTypes = [
            { geometry: <boxGeometry args={[0.5, 0.5, 0.5]} />, name: 'cube' },
            { geometry: <sphereGeometry args={[0.3, 32, 32]} />, name: 'sphere' },
            { geometry: <torusGeometry args={[0.3, 0.1, 16, 100]} />, name: 'torus' },
            { geometry: <cylinderGeometry args={[0.2, 0.2, 0.6, 32]} />, name: 'cylinder' },
            { geometry: <octahedronGeometry args={[0.4]} />, name: 'octahedron' },
        ];

        const colors = ['#00f0ff', '#a855f7', '#10b981', '#ec4899', '#f59e0b'];

        return Array.from({ length: SCENE_CONFIG.OBJECT_COUNT }, (_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10 - 5,
            ],
            geometry: objectTypes[Math.floor(Math.random() * objectTypes.length)].geometry,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotationSpeed: SCENE_CONFIG.ROTATION_SPEED * (0.5 + Math.random()),
            floatSpeed: SCENE_CONFIG.FLOAT_SPEED * 1000 * (0.5 + Math.random()),
        }));
    }, []);

    // Camera parallax effect based on mouse movement
    useFrame(() => {
        if (cameraRef.current) {
            const targetX = mousePosition.x * SCENE_CONFIG.PARALLAX_STRENGTH;
            const targetY = -mousePosition.y * SCENE_CONFIG.PARALLAX_STRENGTH;

            cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
            cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
        }
    });

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[0, 0, 10]}
                fov={SCENE_CONFIG.CAMERA_FOV}
                near={SCENE_CONFIG.CAMERA_NEAR}
                far={SCENE_CONFIG.CAMERA_FAR}
            />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
            <pointLight position={[0, 0, 0]} intensity={0.5} color="#10b981" />

            {/* Floating objects */}
            {objects.map((obj) => (
                <FloatingObject key={obj.id} {...obj} />
            ))}
        </>
    );
}

// Main exported component
export default function Scene3D() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
            >
                <Scene3DContent mousePosition={mousePosition} />
            </Canvas>
        </div>
    );
}
