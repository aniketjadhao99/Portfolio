import React from 'react';
import { Cpu, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass" style={{ 
            padding: '40px 0', 
            marginTop: '100px', 
            borderTop: '1px solid var(--glass-border)',
            borderRadius: '0'
        }}>
           <div className="container" style={{ 
               display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'center', 
               gap: '30px' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Cpu className="glow-text" size={32} />
                    <span style={{ 
                        fontFamily: 'var(--font-futuristic)', 
                        fontWeight: '900',
                        fontSize: '1.8rem'
                    }}>
                        ANIKET<span className="glow-text">.INFO</span>
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '30px' }}>
                    <a href="https://github.com/aniketjadhao99" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><Github size={24} /></a>
                    <a href="#" style={{ color: 'var(--text-secondary)' }}><Twitter size={24} /></a>
                    <a href="#" style={{ color: 'var(--text-secondary)' }}><Linkedin size={24} /></a>
                    <a href="#" style={{ color: 'var(--text-secondary)' }}><Instagram size={24} /></a>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    &copy; 2026 ANIKET.INFO - ALL RIGHTS RESERVED
                </p>
           </div>
        </footer>
    );
};

export default Footer;
