import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface ThemeSwitchProps {
    theme: 'dark' | 'light';
    onThemeChange: (theme: 'dark' | 'light') => void;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = React.memo(({ theme, onThemeChange }) => (
    <div className="theme-switch">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onThemeChange('dark')}
            className={theme === 'dark' ? 'active' : ''}
            aria-label="Dark theme"
        >
            <Moon size={16} />
        </motion.button>
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onThemeChange('light')}
            className={theme === 'light' ? 'active' : ''}
            aria-label="Light theme"
        >
            <Sun size={16} />
        </motion.button>
    </div>
));