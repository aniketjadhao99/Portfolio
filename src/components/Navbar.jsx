import React, { useEffect, useState } from 'react';
import { Menu, X, Cpu, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: isScrolled ? '10px' : '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: isScrolled ? '95%' : '90%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: isScrolled ? '12px 40px' : '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
      background: isScrolled ? 'rgba(5, 5, 5, 0.8)' : 'var(--glass-bg)',
      borderColor: isScrolled ? 'var(--accent-cyan)' : 'var(--glass-border)',
      boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <motion.div
          animate={{ rotate: isScrolled ? 360 : 0 }}
          transition={{ duration: 1 }}
        >
          <Cpu className="glow-text" size={28} />
        </motion.div>
        <span style={{
          fontFamily: 'var(--font-futuristic)',
          fontWeight: '900',
          fontSize: '1.4rem',
          letterSpacing: '2px'
        }}>
          ANIKET<span className="glow-text">.INFO</span>
        </span>
      </div>

      <div className="desktop-menu" style={{ display: 'flex', gap: '40px' }}>
        {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ scale: 1.1, color: 'var(--accent-cyan)' }}
            style={{
              textDecoration: 'none',
              color: isScrolled ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-futuristic)',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}
          >
            {item}
          </motion.a>
        ))}
        <motion.a
          href="https://github.com/aniketjadhao99"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }}
          style={{
            color: isScrolled ? '#fff' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Github size={20} />
        </motion.a>
      </div>


      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer', zIndex: 1001 }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: 'fixed',
              top: '80px',
              left: '5%',
              width: '90%',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 999,
              background: 'rgba(10, 10, 12, 0.95)',
              alignItems: 'center'
            }}
          >
            {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
              <a
                key={`mobile-${item}`}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-futuristic)',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  width: '100%',
                  textAlign: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--glass-border)'
                }}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
