import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#050505',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-futuristic)'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginBottom: '40px' }}
                    >
                        <h2 className="glow-text" style={{ fontSize: '1rem', letterSpacing: '4px' }}>
                            INITIALIZING SYSTEM...
                        </h2>
                    </motion.div>

                    <div style={{
                        width: '300px',
                        height: '2px',
                        background: 'rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={{ width: `${progress}%` }}
                            style={{
                                height: '100%',
                                background: 'var(--accent-cyan)',
                                boxShadow: '0 0 15px var(--accent-cyan)'
                            }}
                        />
                    </div>

                    <div style={{ marginTop: '20px', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                        {progress}%
                    </div>

                    {/* Matrix-like decoding effect for fun */}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        fontSize: '0.6rem',
                        color: 'rgba(0, 243, 255, 0.2)',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        BOOT_SECTOR: LOAD [0x00A1F] / CORE_ENGINE: SYNCED
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
