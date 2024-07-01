import React from 'react';
import { ReactTyped } from 'react-typed';

export const Header: React.FC = () => {
    const texts = [
        'I am Maya',
        'Freelance',
        'Contact me',
        'I make cool stuff',
        'Your Ideas, My Canvas',
    ];

    return (
        <header className="cosmic-header">
            <div className="header-content">
                <h1>
                    <ReactTyped
                        strings={texts}
                        typeSpeed={100}
                        backSpeed={50}
                        loop
                    />
                </h1>
            </div>
            <div className="cosmic-stars">
                {[...Array(50)].map((_, i) => (
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
        </header>
    );
};
