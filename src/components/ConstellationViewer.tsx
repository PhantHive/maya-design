// components/ConstellationViewer.tsx
import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
import { portfolioData, isLogoConstellation } from '../types/Portfolio';
import useSwipeBehavior from '../effects/useSwipeBehavior';
import { ThemeContext } from '../contexts/ThemeContext.tsx';

interface StarProps {
    x: number;
    y: number;
    size?: number;
    depth: number;
    pulse?: boolean;
}

const Star: React.FC<StarProps> = ({ x, y, size = 5, depth, pulse = false }) => (
    <motion.div
        className={`star ${pulse ? 'pulse' : ''}`}
        style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            transform: `translateZ(${depth}px)`,
            position: 'absolute'
        }}
        animate={pulse ? {
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
        } : undefined}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    />
);

const ConstellationLines: React.FC<{
    stars: { x: number; y: number }[];
    highlight: boolean;
}> = ({ stars, highlight }) => (
    <svg className="constellation-svg" viewBox="0 0 300 300">
        <g stroke={highlight ? 'var(--primary-color)' : '#ffffff'} strokeWidth="1">
            {stars.map((dot, index) => {
                const nextDot = stars[index + 1];
                if (nextDot) {
                    return (
                        <motion.line
                            key={`line-${index}`}
                            x1={dot.x}
                            y1={dot.y}
                            x2={nextDot.x}
                            y2={nextDot.y}
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

export const EnhancedConstellationViewer: React.FC = () => {
    const [selectedConstellation, setSelectedConstellation] = useState<number | null>(null);
    const [isPhoneScreen, setIsPhoneScreen] = useState<boolean>(
        window.matchMedia('(max-width: 768px)').matches
    );
    const { theme } = useContext(ThemeContext);

    const logoItems = portfolioData.filter(isLogoConstellation);
    const { currentConstellation, handlers } = useSwipeBehavior(logoItems.length);

    const viewerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [5, -5]));
    const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-5, 5]));

    React.useEffect(() => {
        const handleResize = () =>
            setIsPhoneScreen(window.matchMedia('(max-width: 768px)').matches);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('resize', handleResize);
        if (!isPhoneScreen && viewerRef.current) {
            viewerRef.current.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            viewerRef.current?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isPhoneScreen, mouseX, mouseY]);

    return (
        <motion.div
            className="constellation-viewer"
            ref={viewerRef}
            style={{ rotateX, rotateY }}
            data-theme={theme}
        >
            <div className="constellations-container" {...(isPhoneScreen ? handlers : {})}>
                {isPhoneScreen ? (
                    // Mobile view - no AnimatePresence
                    logoItems.map((constellation, index) => {
                        const isCurrent = index === currentConstellation;
                        if (!isCurrent) return null;

                        return (
                            <div
                                key={constellation.id}
                                className={`constellation active`}
                            >
                                <div className="constellation-content">
                                    <ConstellationLines
                                        stars={constellation.stars}
                                        highlight={false}
                                    />
                                    <div className="constellation-stars">
                                        {constellation.stars.map((dot, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                x={dot.x}
                                                y={dot.y}
                                                depth={0}
                                                pulse={false}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="constellation-image-container">
                                    <img
                                        src={constellation.image}
                                        alt={constellation.name}
                                        className="project-image"
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Desktop view - keep original animations
                    <AnimatePresence>
                        {logoItems.map((constellation,) => (
                            <motion.div
                                key={constellation.id}
                                className="constellation"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                onHoverStart={() => setSelectedConstellation(constellation.id)}
                                onHoverEnd={() => setSelectedConstellation(null)}
                            >
                                <div className="constellation-content">
                                    <ConstellationLines
                                        stars={constellation.stars}
                                        highlight={selectedConstellation === constellation.id}
                                    />
                                    <div className="constellation-stars">
                                        {constellation.stars.map((dot, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                x={dot.x}
                                                y={dot.y}
                                                depth={0}
                                                pulse={selectedConstellation === constellation.id}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <motion.div
                                    className="constellation-image-container"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: selectedConstellation === constellation.id ? 1 : 0 }}
                                >
                                    <motion.img
                                        src={constellation.image}
                                        alt={constellation.name}
                                        className="project-image"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {isPhoneScreen && (
                <div className="swipe-indicator">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <span className="s">S</span>
                        <span className="w">W</span>
                        <span className="i">I</span>
                        <span className="p">P</span>
                        <span className="e">E</span>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};