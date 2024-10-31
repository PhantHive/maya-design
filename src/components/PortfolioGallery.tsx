import React, { useState, useContext, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { PortfolioItem } from '../types/Portfolio';
import { portfolioData } from '../types/Portfolio';
import { ThemeContext } from '../contexts/ThemeContext';

const PortfolioGallery: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [filter, setFilter] = useState<'all' | 'logo' | 'ui' | 'advertising'>('all');
    const [isDisabled, setIsDisabled] = useState(false);
    const { theme } = useContext(ThemeContext);

    const filteredItems = useMemo(() => {
        return portfolioData.filter(item => filter === 'all' || item.type === filter);
    }, [filter]);

    const handleFilterChange = useCallback((id: string) => {
        const debounce = (func: (...args: never[]) => void, wait: number) => {
            let timeout: NodeJS.Timeout;
            return (...args: never[]) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func(...args), wait);
            };
        };

        const debouncedSetFilter = debounce(() => {
            setIsDisabled(true);
            setFilter(id as never);
            setTimeout(() => setIsDisabled(false), 300); // Re-enable buttons after 300ms
        }, 300);

        debouncedSetFilter();
    }, []);

    const filterButtons = [
        { id: 'all', label: 'All Work' },
        { id: 'ui', label: 'UI Design' },
        { id: 'logo', label: 'Logo Design' },
        { id: 'advertising', label: 'Advertising' }
    ];

    return (
        <div className="portfolio-section" data-theme={theme}>
            <div className="filter-buttons mb-8 flex justify-center gap-4">
                {filterButtons.map(({ id, label }) => (
                    <motion.button
                        key={id}
                        onClick={() => handleFilterChange(id as never)}
                        className={`px-6 py-3 rounded-full transition-all ${
                            filter === id ? 'active' : ''
                        }`}
                        data-theme={theme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isDisabled}
                    >
                        {label}
                    </motion.button>
                ))}
            </div>

            <motion.div className="portfolio-grid" layout>
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`portfolio-${item.id}`}
                            className="portfolio-item"
                            data-theme={theme}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="item-title" data-theme={theme}>
                                {item.name}
                            </div>
                            <div className="item-container" data-theme={theme}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="portfolio-image"
                                />
                                <div className="portfolio-overlay" data-theme={theme}>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="portfolio-modal"
                        data-theme={theme}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setSelectedItem(null);
                            }
                        }}
                    >
                        <div className="modal-content" data-theme={theme}>
                            <motion.button
                                className="close-button"
                                onClick={() => setSelectedItem(null)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>

                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-auto"
                            />

                            <div className="modal-body">
                                <h2 className="text-2xl font-bold mb-4">
                                    {selectedItem.name}
                                </h2>
                                <p className={`mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {selectedItem.description}
                                </p>

                                {selectedItem.type === 'ui' && (
                                    <div className="space-y-4">
                                        <div className="tech-tags">
                                            {selectedItem.technologies.map((tech) => (
                                                <span key={tech} data-theme={theme}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        {selectedItem.liveUrl && (
                                            <a
                                                href={selectedItem.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-primary-color hover:text-primary-color/80"
                                            >
                                                <ExternalLink size={16} />
                                                View Live Project
                                            </a>
                                        )}
                                    </div>
                                )}

                                {selectedItem.type === 'advertising' && (
                                    <div className="space-y-2 mt-4">
                                        <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                            <strong>Client:</strong>{' '}
                                            {selectedItem.client}
                                        </p>
                                        <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                            <strong>Campaign Date:</strong>{' '}
                                            {selectedItem.campaignDate}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioGallery;