import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="cosmic-footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a
                        href="https://www.linkedin.com/in/mayagozel-ovezova-46655a211/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="linkedin.png" alt="LinkedIn" />
                    </a>
                    <a
                        href="https://www.behance.net/mayagozovezova"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="behance.svg" alt="Behance" />
                    </a>
                </div>
                <div className="copyright">
                    © 2024, Maya Graphic Designer. All rights reserved.
                </div>
            </div>
            <div className="cosmic-stars">
                {[...Array(30)].map((_, i) => (
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
        </footer>
    );
};
