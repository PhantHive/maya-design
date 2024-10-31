// Footer.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const BehanceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 6H22V18H16.5C11.5 18 11.5 6 16.5 6Z" />
        <path d="M2 7H8.5C12.5 7 12.5 13 8.5 13H2V7Z" />
        <path d="M2 13H8.5C12.5 13 12.5 19 8.5 19H2V13Z" />
        <path d="M15 13H19" />
    </svg>
);

export const Footer: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <footer className="cosmic-footer" data-theme={theme}>
            <div className="footer-content">
                <div className="social-icons">
                    <a
                        href="https://www.linkedin.com/in/mayagozel-ovezova-46655a211/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon />
                    </a>
                    <a
                        href="https://www.behance.net/mayagozovezova"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Behance"
                    >
                        <BehanceIcon />
                    </a>
                </div>
                <div className="copyright">
                    © 2024, Maya Graphic Designer. All rights reserved.
                </div>
            </div>
            {theme === 'dark' && (
                <div className="cosmic-stars">
                    {[...Array(20)].map((_, i) => (
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
        </footer>
    );
};