import React, { useContext } from 'react';
import { ReactTyped } from 'react-typed';
import { ThemeContext } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const texts = [
        'I am Maya',
        'Welcome to my Portfolio',
    ];

    return (
        <header className="cosmic-header" data-theme={theme}>
            <div className="header-content">
                <h1>
                    <ReactTyped
                        strings={texts}
                        typeSpeed={150}
                        backSpeed={50}
                        loop
                    />
                </h1>
            </div>
            {theme === 'dark' && (
                <div className="cosmic-stars">
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 3 + 1}s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </header>
    );
};