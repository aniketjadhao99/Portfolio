import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Preloader from './components/Preloader';
import ThreeModel from './components/ThreeModel';

const SectionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.1 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate initial loading sequence for that futuristic feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Preloader />

      {!isLoading && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
          >
            <ParticleBackground />
            <ThreeModel />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(20, 20, 24, 0) 0%, rgba(5, 5, 5, 1) 100%)',
              zIndex: -1,
              pointerEvents: 'none'
            }}></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
          {/* Custom Cursor */}
          <motion.div
            animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            style={{
              position: 'fixed',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '2px solid var(--accent-cyan)',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          />
          <motion.div
            animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            style={{
              position: 'fixed',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-cyan)',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          />

          <Navbar />
          <SectionWrapper><Hero /></SectionWrapper>
          <About />
          <SectionWrapper><Services /></SectionWrapper>
          <SectionWrapper><Projects /></SectionWrapper>
          <SectionWrapper><Contact /></SectionWrapper>
          <Footer />

          </motion.div>
        </>
      )}
    </div>
  );
}

export default App;
