import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layers, Zap, Layout, Shield, Infinity } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ 
      y: -15, 
      boxShadow: '0 20px 40px rgba(0, 243, 255, 0.25)',
      borderColor: 'var(--accent-cyan)'
    }}
    className="glass" 
    style={{
      padding: '40px',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s ease'
    }}
  >
    <motion.div 
      animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, transparent 70%)',
        top: '-10px',
        right: '-10px',
        zIndex: -1
      }}
    ></motion.div>
    
    <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          background: 'rgba(0, 243, 255, 0.1)', 
          width: '60px', 
          height: '60px', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '25px',
          border: '1px solid rgba(0, 243, 255, 0.2)'
        }}>
           <Icon className="glow-text" size={30} />
        </div>
        
        <h3 style={{ 
          fontSize: '1.4rem', 
          marginBottom: '15px', 
          fontFamily: 'var(--font-futuristic)',
          fontWeight: '700',
          letterSpacing: '1px'
        }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
          {description}
          <style>{`
            strong {
              color: var(--text-primary);
              font-weight: 700;
            }
          `}</style>
        </p>

        <motion.div 
           initial={{ width: 0 }}
           whileHover={{ width: '100%' }}
           style={{ 
             height: '2px', 
             background: 'var(--accent-cyan)', 
             marginTop: '25px', 
             opacity: 0.5 
           }}
        />
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "SCALABLE ARCHITECTURE",
      description: <>Building robust, custom-coded systems using <strong>PHP</strong> and <strong>Node.js</strong> to handle high-traffic business logic.</>
    },
    {
      icon: Layers,
      title: "EXTREME UI/UX",
      description: <>Hyper-interactive interfaces crafted using <strong>React</strong> and <strong>Tailwind CSS</strong>, ensuring maximum user retention.</>
    },
    {
      icon: Zap,
      title: "QUANTUM OPT",
      description: <>Ultra-low latency deployments with optimized <strong>PostgreSQL</strong> query performance and efficient build pipelines.</>
    },
    {
      icon: Layout,
      title: "GRID STRATEGIES",
      description: <>Non-linear design philosophies implemented via complex <strong>CSS Grid</strong> and flexible layouts for total responsiveness.</>
    },
    {
      icon: Shield,
      title: "FULL-STACK SYSTEMS",
      description: <>Custom-engineered <strong>end-to-end</strong> solutions, specialized in high-performance web applications and data-driven logic.</>
    },
    {
      icon: Infinity,
      title: "EVOLUTIONARY DEV",
      description: <>Future-proof engineering using <strong>Agile/Scrum</strong> methodologies to keep your business at the frontier of innovation.</>
    }
  ];

  return (
    <section id="services" style={{ paddingTop: '160px' }}>
      <div className="container">
         <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                    Services
                  </span>
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px', letterSpacing: '4px' }}>
                  THE <span className="gradient-text">TECHNIQUE</span>
                </h2>
                <div style={{ width: '80px', height: '4px', background: 'var(--accent-purple)', margin: '0 auto 30px' }}></div>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto', fontSize: '1.1rem', letterSpacing: '1px' }}>
                  Fusing scientific precision with artistic vision into digital ecosystems.
                </p>
            </motion.div>
         </div>

         <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           style={{ 
             display: 'grid', 
             gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
             gap: '30px' 
           }}
         >
           {services.map((s, i) => (
             <ServiceCard key={i} {...s} />
           ))}
         </motion.div>
      </div>
    </section>
  );
};

export default Services;
