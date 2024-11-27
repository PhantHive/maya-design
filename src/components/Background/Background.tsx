import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';
import { StarField, CloudField } from './BackgroundElements';

export const Background: React.FC = React.memo(() => {
    const { theme } = useContext(ThemeContext);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={`background-container ${theme}-theme`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {theme === 'dark' ? <StarField /> : <CloudField />}
            </motion.div>
        </AnimatePresence>
    );
});