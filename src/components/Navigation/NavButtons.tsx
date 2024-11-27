import React from 'react';
import { motion } from 'framer-motion';
import { Star, Layers } from 'lucide-react';

interface NavButtonsProps {
    activeSection: 'constellations' | 'portfolio';
    isDisabled: boolean;
    onNavChange: (section: 'constellations' | 'portfolio') => void;
    theme: 'dark' | 'light';
}

export const NavButtons: React.FC<NavButtonsProps> = React.memo(({
    activeSection,
    isDisabled,
    onNavChange,
    theme
}) => (
    <nav className="nav-buttons" data-theme={theme}>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavChange('constellations')}
            className={activeSection === 'constellations' ? 'active' : ''}
            disabled={isDisabled}
        >
            <Star size={16} />
            <span>Logos</span>
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavChange('portfolio')}
            className={activeSection === 'portfolio' ? 'active' : ''}
            disabled={isDisabled}
        >
            <Layers size={16} />
            <span>Portfolio</span>
        </motion.button>
    </nav>
));