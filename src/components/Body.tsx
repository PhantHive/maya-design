import React, { useState, useMemo, useEffect } from 'react';
import { constellations } from '../typings/Constellation.tsx';
import useSwipeBehavior from '../effects/useSwipeBehavior.tsx';

export const Body = () => {
    const [selectedConstellation, setSelectedConstellation] = useState<
        number | null
    >(null);
    // const constellationRef = useRef<HTMLDivElement | null>(null);

    const handleMouseOverConstellation = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        const target = event.currentTarget;
        const id = parseInt(target.dataset.id || '0');
        setSelectedConstellation(id);
    };

    const handleMouseOutConstellation = () => {
        setSelectedConstellation(null);
    };

    const movingStars = useMemo(
        () =>
            Array.from({ length: 150 }, (_, i) => ({
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 5}px`,
                    height: `${Math.random() * 5}px`,
                    animationDuration: `${Math.random() * 15 + 7}s`,
                    animationDelay: `${Math.random() * 5}s`,
                },
            })),
        [],
    );

    const [isPhoneScreen, setIsPhoneScreen] = useState(
        window.matchMedia('(max-width: 1200px)').matches,
    );
    const { currentConstellation, handlers } = useSwipeBehavior(
        constellations.length,
    );

    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen(window.matchMedia('(max-width: 768px)').matches);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="background" {...(isPhoneScreen ? handlers : {})}>
            <div className="moving-stars">
                {movingStars.map((star) => (
                    <div
                        key={star.id}
                        className="movingStars"
                        style={star.style}
                    />
                ))}
            </div>
            <div className="constellations">
                {constellations.map((constellation, index) => {
                    const isCurrent = index === currentConstellation;
                    const isNext =
                        index ===
                        (currentConstellation + 1) % constellations.length;
                    const isPrevious =
                        index ===
                        (currentConstellation - 1 + constellations.length) %
                            constellations.length;
                    if (isPhoneScreen && index !== currentConstellation) {
                        return null;
                    }

                    const constellationWidth =
                        (constellation.constellationSize[1].x /
                            window.innerWidth) *
                        100;
                    const constellationHeight =
                        (constellation.constellationSize[1].y /
                            window.innerHeight) *
                        100;
                    console.error(
                        `creating constellation from ${constellation.constellationSize[0].x}, ${constellation.constellationSize[0].y} to ${constellationWidth}, ${constellationHeight}`,
                    );

                    const style = isPhoneScreen
                        ? {
                              width: `${constellationWidth}%`,
                              height: `${constellationHeight}%`,
                          }
                        : {
                              left: `${constellation.constellationSize[0].x}%`,
                              top: `${constellation.constellationSize[0].y}%`,
                              width: `${constellationWidth}%`,
                              height: `${constellationHeight}%`,
                          };

                    return (
                        <div
                            key={constellation.id}
                            className={`constellation ${isCurrent ? 'active' : ''} ${isNext ? 'next' : ''} ${isPrevious ? 'previous' : ''}`}
                            data-id={constellation.id.toString()}
                            style={style}
                            onMouseOver={handleMouseOverConstellation}
                            onMouseOut={handleMouseOutConstellation}
                        >
                            {/*  between each star of a constellation draw a line */}

                            <svg className="constellation-svg">
                                {constellation.stars.map((dot, index) => {
                                    const nextDot =
                                        constellation.stars[index + 1] || null;
                                    if (nextDot) {
                                        let x1 = dot.x + 6; // Add half constellationWidth (12px / 2)
                                        let y1 = dot.y + 6; // Add half constellationHeight (12px / 2)
                                        let x2 = nextDot.x + 6;
                                        let y2 = nextDot.y + 6;

                                        x1 =
                                            (x1 /
                                                constellation
                                                    .constellationSize[1].x) *
                                            100;
                                        y1 =
                                            (y1 /
                                                constellation
                                                    .constellationSize[1].y) *
                                            100;
                                        x2 =
                                            (x2 /
                                                constellation
                                                    .constellationSize[1].x) *
                                            100;
                                        y2 =
                                            (y2 /
                                                constellation
                                                    .constellationSize[1].y) *
                                            100;

                                        console.error(
                                            `creating line from ${x1}, ${y1} to ${x2}, ${y2}`,
                                        );
                                        return (
                                            <line
                                                className="constellation-line"
                                                key={
                                                    dot.x +
                                                    dot.y +
                                                    nextDot.x +
                                                    nextDot.y
                                                }
                                                x1={`${x1}%`}
                                                y1={`${y1}%`}
                                                x2={`${x2}%`}
                                                y2={`${y2}%`}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </svg>

                            {constellation.stars.map((dot) => {
                                // draw stars relatively to the constellation size (pixel of the star relative to the size of the constellation)
                                const xRelative =
                                    dot.x /
                                    constellation.constellationSize[1].x;
                                const yRelative =
                                    dot.y /
                                    constellation.constellationSize[1].y;
                                const x = xRelative * 100;
                                const y = yRelative * 100;
                                console.error(`creating star at ${x}, ${y}`);
                                return (
                                    <div
                                        key={dot.x + dot.y}
                                        className="stars"
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                        }}
                                    ></div>
                                );
                            })}
                            {selectedConstellation === constellation.id && (
                                <img
                                    src={constellation.image}
                                    alt={constellation.name || ''}
                                    className="project-image"
                                /> // Display image on hover
                            )}
                        </div>
                    );
                })}
                {isPhoneScreen && (
                    <div className="swipe-indicator">
                        <span className="s">S</span>
                        <span className="w">W</span>
                        <span className="i">I</span>
                        <span className="p">P</span>
                        <span className="e">E</span>
                    </div>
                )}
            </div>
        </div>
    );
};
