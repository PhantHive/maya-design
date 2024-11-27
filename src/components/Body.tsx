import React, { useState, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';
import { Background } from './Background/Background';
import { ThemeSwitch } from './Navigation/ThemeSwitch';
import { NavButtons } from './Navigation/NavButtons';
import { EnhancedConstellationViewer } from './ConstellationViewer';
import PortfolioGallery from './PortfolioGallery';
import { useDebounce } from '../hooks/useDebounce';

export const Body: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'constellations' | 'portfolio'>('constellations');
    const [isDisabled, setIsDisabled] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);
    const debouncedSetActiveSection = useDebounce(setActiveSection, 300);

    const handleNavChange = useCallback((section: 'constellations' | 'portfolio') => {
        setIsDisabled(true);
        debouncedSetActiveSection(section);
        setTimeout(() => setIsDisabled(false), 450);
    }, [debouncedSetActiveSection]);

    return (
        <>
            <Background />
            <div className="body-container">
                <ThemeSwitch theme={theme} onThemeChange={setTheme} />
                <NavButtons
                    activeSection={activeSection}
                    isDisabled={isDisabled}
                    onNavChange={handleNavChange}
                    theme={theme}
                />
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
