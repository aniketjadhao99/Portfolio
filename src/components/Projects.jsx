import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, CodeSquare, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, category, github, live, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    viewport={{ once: true }}
    whileHover={{ 
        y: -20,
        rotateY: 5,
        rotateX: -5,
        transition: { duration: 0.3 }
    }}
    className="glass"
    style={{
      padding: '24px',
      height: '100%',
      position: 'relative',
      perspective: '1000px',
      transformStyle: 'preserve-3d',
      cursor: 'pointer'
    }}
  >
    <div style={{
      width: '100%',
      height: '280px',
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--glass-border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <CodeSquare size={60} className="glow-text" style={{ opacity: 0.4 }} />
      </motion.div>
      
      {/* Decorative scanning line animation */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
          opacity: 0.3,
          zIndex: 2
        }}
      />

      <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(5, 5, 5, 0.9))'
      }}></div>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ transform: 'translateZ(20px)' }}>
        <span style={{ 
          fontSize: '0.75rem', 
          fontFamily: 'var(--font-futuristic)', 
          color: 'var(--accent-purple)', 
          fontWeight: '900',
          letterSpacing: '2px'
        }}>
          {category}
        </span>
        <h3 style={{ fontSize: '1.5rem', margin: '10px 0', letterSpacing: '1px' }}>{title}</h3>
      </div>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        <motion.a 
            whileHover={{ scale: 1.2, color: 'var(--accent-pink)' }}
            href={github} 
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
        >
            <Github size={22} />
        </motion.a>
        <motion.a 
            whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }}
            href={live} 
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
        >
            <ArrowUpRight size={22} />
        </motion.a>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      title: "CYBERZSEC",
      category: "React.js | Node.js | Tailwind CSS | GSAP",
      github: "#",
      live: "https://cyberzsec.com/"
    },
    {
      title: "PRIYA CHAVAN MAKEUP",
      category: "HTML5 | CSS3 | JavaScript | GSAP | Framer Motion",
      github: "#",
      live: "https://priyachavanmakeupartist.in/"
    },
    {
      title: "CYBERZCOP",
      category: "React.js | Node.js | Tailwind CSS | GSAP | Web Security Protocols",
      github: "#",
      live: "https://cyberzsec.com/cyberzcop.html"
    },
    {
      title: "VITTHAL PHOTOS",
      category: "PHP | PostgreSQL | JavaScript | Tailwind CSS",
      github: "#",
      live: "/vitthal_photos.html"
    }
  ];

  return (
    <section id="work" style={{ paddingTop: '160px', paddingBottom: '200px' }}>
       <div className="container">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '100px' }}
          >
             <h2 style={{ fontSize: '4rem', letterSpacing: '6px' }}>
                SELECTED <span className="gradient-text">SYSTEMS</span>
             </h2>
             <div style={{ 
               width: '100px', 
               height: '4px', 
               background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', 
               marginTop: '20px' 
             }}></div>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '80px' 
          }}>
            {projects.map((p, i) => (
              <ProjectCard key={i} index={i} {...p} />
            ))}
          </div>
       </div>
    </section>
  );
};


export default Projects;
