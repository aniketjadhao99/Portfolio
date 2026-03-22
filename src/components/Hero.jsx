import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Sparkles, ChevronDown } from 'lucide-react';
import GlitchText from './GlitchText';

const Hero = () => {
  return (
    <section id="home" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      paddingTop: '80px',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px', 
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '10px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '40px',
            backdropFilter: 'blur(20px)'
          }}>
            <Sparkles size={14} className="glow-text" />
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-cyan)', letterSpacing: '4px', textTransform: 'uppercase' }}>
              System: Online
            </span>
          </div>
          
          <div style={{ 
            fontSize: 'min(7rem, 15vw)', 
            lineHeight: '0.85', 
            fontWeight: '900',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <GlitchText text="ANIKET JADHAO" />
            <span style={{ fontSize: '0.35em', display: 'block', marginTop: '15px', color: 'var(--text-secondary)', letterSpacing: '8px', fontWeight: '400' }}>
                FULL_STACK_ARCHITECT
            </span>
          </div>
          
          <p style={{ 
            maxWidth: '550px', 
            margin: '0 auto 60px', 
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            letterSpacing: '0.5px'
          }}>
            High-performance engineering meets custom-coded solutions. From secure examination platforms to complex logistics ecosystems, I build digital products that push the boundaries of the modern web.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-futuristic" style={{ padding: '15px 35px', flex: '1 1 auto', maxWidth: '300px' }}>
              REVEAL WORK
            </button>
            <button className="btn-futuristic" style={{ 
              border: '1px solid var(--accent-purple)', 
              color: 'var(--accent-purple)',
              padding: '15px 35px',
              flex: '1 1 auto', maxWidth: '300px'
            }}>
               GET IN TOUCH
            </button>
          </div>
        </motion.div>
      </div>

      
      {/* Subtle Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 0.5
        }}
      >
          <span style={{ fontSize: '0.7rem', letterSpacing: '2px', fontFamily: 'var(--font-futuristic)' }}>SCROLL</span>
          <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
