import React, { useState, useEffect, useRef } from 'react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    useSpring,
} from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { constellations, Constellation } from '../typings/Constellation';
import useSwipeBehavior from '../effects/useSwipeBehavior';
import { Header } from './Header';

interface StarProps {
    x: number;
    y: number;
    size?: number;
    depth: number;
    pulse?: boolean;
}

const Star: React.FC<StarProps> = ({
    x,
    y,
    size = 2,
    depth,
    pulse = false,
}) => (
    <motion.div
        className="star"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateZ(${depth}px)`,
        }}
        animate={
            pulse
                ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                  }
                : {}
        }
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    />
);

interface ConstellationLinesProps {
    stars: { x: number; y: number }[];
    highlight: boolean;
}

const ConstellationLines: React.FC<ConstellationLinesProps> = ({
    stars,
    highlight,
}) => (
    <svg className="constellation-svg">
        <g stroke={highlight ? '#00d9f6' : '#ffffff'} strokeWidth="1">
            {stars.map((dot, index) => {
                const nextDot = stars[index + 1];
                if (nextDot) {
                    return (
                        <motion.line
                            key={`line-${index}`}
                            x1={`${(dot.x / 300) * 100}%`}
                            y1={`${(dot.y / 300) * 100}%`}
                            x2={`${(nextDot.x / 300) * 100}%`}
                            y2={`${(nextDot.y / 300) * 100}%`}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                        />
                    );
                }
                return null;
            })}
        </g>
    </svg>
);

interface ConstellationImageProps {
    image: string;
    name: string;
}

const ConstellationImage: React.FC<ConstellationImageProps> = ({
    image,
    name,
}) => (
    <motion.img
        src={image}
        alt={name}
        className="project-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    />
);

const SmoothBlackHole = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (viewport.width < 1200) {
                setOpacity(0.5);
            } else {
                setOpacity(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewport]);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.001;
        }
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
            materialRef.current.uniforms.opacity.value = opacity;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[0, 5, -10]}
            scale={[viewport.width, viewport.height, 1]}
        >
            <planeGeometry args={[1, 1, 5, 5]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={{
                    time: { value: 0 },
                    resolution: {
                        value: new THREE.Vector2(
                            viewport.width,
                            viewport.height,
                        ),
                    },
                    opacity: { value: opacity },
                    radius: { value: 0.8 }, // New uniform for the radius
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform float time;
                    uniform vec2 resolution;
                    uniform float opacity;
                    uniform float radius; // New uniform for the radius
                    varying vec2 vUv;

                    float sdCircle(vec2 p, float r) {
                        return length(p) - r;
                    }

                    void main() {
                        vec2 uv = (vUv - 0.5) * 2.0;
                        uv.x *= resolution.x / resolution.y;

                        // Calculate the distance from the center
                        float dist = length(uv);

                        // If outside the radius, discard the fragment
                        if (dist > radius) {
                            discard;
                        }

                        float d = sdCircle(uv, 0.2);
                        float glow = 0.02 / (abs(d) + 0.01);

                        float angle = atan(uv.y, uv.x);
                        float spiral = sin(20.0 * (angle - 10.0 * time + length(uv)));
                        glow += 0.05 * spiral / (abs(d) + 0.07);

                        vec3 col = vec3(0.1, 0.0, 0.1) + glow * vec3(0.2, 0.3, 0.5);
                        col = mix(col, vec3(0.0), smoothstep(0.0, 0.1, d));

                        gl_FragColor = vec4(col, opacity);
                    }
                `}
                transparent={true}
            />
        </mesh>
    );
};

const AnimatedSpace: React.FC = () => {
    const isPhoneScreen = window.matchMedia('(max-width: 1200px)').matches;
    return (
        <>
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            {!isPhoneScreen && <SmoothBlackHole />}
        </>
    );
};

export const EnhancedConstellationViewer: React.FC = () => {
    const [selectedConstellation, setSelectedConstellation] = useState<
        number | null
    >(null);
    const [isPhoneScreen, setIsPhoneScreen] = useState<boolean>(
        window.matchMedia('(max-width: 1200px)').matches,
    );
    const { currentConstellation, handlers } = useSwipeBehavior(
        constellations.length,
    );
    const viewerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(
        useTransform(mouseY, [0, window.innerHeight], [5, -5]),
    );
    const rotateY = useSpring(
        useTransform(mouseX, [0, window.innerWidth], [-5, 5]),
    );

    useEffect(() => {
        const handleResize = () =>
            setIsPhoneScreen(window.matchMedia('(max-width: 1200px)').matches);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (!isPhoneScreen && viewerRef.current) {
            viewerRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (viewerRef.current) {
                viewerRef.current.removeEventListener(
                    'mousemove',
                    handleMouseMove,
                );
            }
        };
    }, [isPhoneScreen, mouseX, mouseY]);

    return (
        <motion.div
            className="constellation-viewer"
            ref={viewerRef}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
            }}
        >
            <Canvas>
                <AnimatedSpace />
            </Canvas>
            <div
                className="constellations-container"
                {...(isPhoneScreen ? handlers : {})}
            >
                <AnimatePresence>
                    {constellations.map(
                        (constellation: Constellation, index: number) => {
                            const isCurrent = index === currentConstellation;
                            if (isPhoneScreen && !isCurrent) return null;

                            return (
                                <motion.div
                                    key={constellation.id}
                                    className={`constellation ${isCurrent ? 'active' : ''}`}
                                    style={
                                        isPhoneScreen
                                            ? {
                                                  position: 'absolute',
                                                  top: '50%',
                                                  left: '50%',
                                                  transform:
                                                      'translate(-50%, -50%)',
                                                  width: '80%',
                                                  height: '60%',
                                              }
                                            : {
                                                  position: 'absolute',
                                                  left: `${constellation.constellationSize[0].x}%`,
                                                  top: `${constellation.constellationSize[0].y}%`,
                                                  width: `${(constellation.constellationSize[1].x / window.innerWidth) * 100}%`,
                                                  height: `${(constellation.constellationSize[1].y / window.innerHeight) * 100}%`,
                                                  transform: `translateZ(${50 + index * 20}px)`,
                                              }
                                    }
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    onHoverStart={() =>
                                        setSelectedConstellation(
                                            constellation.id,
                                        )
                                    }
                                    onHoverEnd={() =>
                                        setSelectedConstellation(null)
                                    }
                                >
                                    <div
                                        className="constellation-content"
                                        style={{
                                            width: '100%',
                                            height: '70%',
                                            position: 'relative',
                                        }}
                                    >
                                        <ConstellationLines
                                            stars={constellation.stars}
                                            highlight={
                                                selectedConstellation ===
                                                constellation.id
                                            }
                                        />
                                        {constellation.stars.map(
                                            (dot, index) => (
                                                <Star
                                                    key={index}
                                                    x={
                                                        (dot.x /
                                                            constellation
                                                                .constellationSize[1]
                                                                .x) *
                                                        100
                                                    }
                                                    y={
                                                        (dot.y /
                                                            constellation
                                                                .constellationSize[1]
                                                                .y) *
                                                        100
                                                    }
                                                    depth={0}
                                                    pulse={
                                                        selectedConstellation ===
                                                        constellation.id
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                    {(isPhoneScreen ||
                                        selectedConstellation ===
                                            constellation.id) && (
                                        <div
                                            className="constellation-image-container"
                                            style={{
                                                width: '100%',
                                                height: '30%',
                                                position: 'absolute',
                                                bottom: '0',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ConstellationImage
                                                image={constellation.image}
                                                name={constellation.name}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        },
                    )}
                </AnimatePresence>
            </div>
            {isPhoneScreen && (
                <div className="swipe-indicator">
                    <span className="s">S</span>
                    <span className="w">W</span>
                    <span className="i">I</span>
                    <span className="p">P</span>
                    <span className="e">E</span>
                </div>
            )}
        </motion.div>
    );
};

export const Body: React.FC = () => {
    return (
        <div className="body-container">
            <Header />
            <EnhancedConstellationViewer />
        </div>
    );
};

export default Body;
