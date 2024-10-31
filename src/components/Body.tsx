import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioGallery from './PortfolioGallery';
import { EnhancedConstellationViewer } from './ConstellationViewer';
import { Layers, Star, Moon, Sun } from 'lucide-react';
import { Background } from './Background';
import { ThemeContext } from '../contexts/ThemeContext';
import { useState } from 'react';

export const Body: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'constellations' | 'portfolio'>('constellations');
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <Background />

            <div className="body-container">
                <div className="theme-switch">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTheme('dark')}
                        className={theme === 'dark' ? 'active' : ''}
                        aria-label="Dark theme"
                    >
                        <Moon size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTheme('light')}
                        className={theme === 'light' ? 'active' : ''}
                        aria-label="Light theme"
                    >
                        <Sun size={16} />
                    </motion.button>
                </div>

                <nav className="nav-buttons" data-theme={theme}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveSection('constellations')}
                        className={`${activeSection === 'constellations' ? 'active' : ''}`}
                    >
                        <Star size={16} />
                        <span>Logos</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveSection('portfolio')}
                        className={`${activeSection === 'portfolio' ? 'active' : ''}`}
                    >
                        <Layers size={16} />
                        <span>Portfolio</span>
                    </motion.button>
                </nav>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        className="relative z-10 w-full h-full mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeSection === 'constellations' ? (
                            <EnhancedConstellationViewer />
                        ) : (
                            <PortfolioGallery />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};