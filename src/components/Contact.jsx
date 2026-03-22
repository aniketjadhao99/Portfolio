import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, Globe } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" style={{ overflow: 'hidden' }}>
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
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(188, 19, 254, 0.05)',
                            padding: '10px 20px',
                            borderRadius: '100px',
                            border: '1px solid rgba(188, 19, 254, 0.2)',
                            marginBottom: '30px',
                            backdropFilter: 'blur(20px)'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--accent-purple)',
                                animation: 'pulse 2s infinite'
                            }} />
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '800',
                                color: 'var(--accent-purple)',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                Contact
                            </span>
                        </div>
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
                                START CHAT
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
