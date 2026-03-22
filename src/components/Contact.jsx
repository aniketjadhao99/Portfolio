import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, Globe } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact">
            <div className="container" style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    width: 'min(600px, 100vw)',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(188, 19, 254, 0.05) 0%, transparent 70%)',
                    top: '-10%',
                    right: '-20%',
                    zIndex: -1
                }}></div>

                <div
                    className="glass"
                    style={{
                        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)',
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '20px' }}>
                            READY TO <span className="glow-text">SCALE?</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem' }}>
                            Let's collaborate on your next digital masterpiece.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                            <a
                                href="mailto:contact@aniket.dev"
                                className="btn-futuristic"
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                            >
                                <Mail size={18} />
                                EMAIL US
                            </a>
                            <a
                                href="https://wa.me/919021144760"
                                className="btn-futuristic"
                                style={{
                                    border: '1px solid var(--accent-purple)',
                                    color: 'var(--accent-purple)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    textDecoration: 'none'
                                }}
                            >
                                <MessageCircle size={18} />
                                9021144760
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
