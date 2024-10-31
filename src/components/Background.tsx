import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';

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
                {theme === 'dark' ? (
                    <div className="star-field">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="star" />
                        ))}
                    </div>
                ) : (
                    <div className="cloud-field">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="cloud" />
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
});