import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, CodeSquare, ArrowUpRight, Shield, Camera, Zap, MessageCircle, Palette } from 'lucide-react';

// Add mobile responsive styles
const projectsGridStyles = `
  .projects-grid {
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 640px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
    }
  }
  
  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 60px;
    }
  }
  
  @media (min-width: 1280px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 80px;
    }
  }
`;

// Project Image Component
const ProjectImage = ({ title, icon: Icon, gradientStart, gradientEnd }) => (
  <div style={{
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Animated background */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        width: '150%',
        height: '150%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.3
      }}
    />
    
    {/* Icon */}
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      <Icon size={80} color="rgba(255, 255, 255, 0.9)" strokeWidth={1.5} />
    </motion.div>

    {/* Scan line effect */}
    <motion.div 
      animate={{ top: ['-10%', '110%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
        opacity: 0.4,
        zIndex: 2
      }}
    />

    {/* Overlay gradient */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, transparent 40%, rgba(5, 5, 5, 0.5))',
      zIndex: 3
    }}></div>
  </div>
);

const ProjectCard = ({ title, category, github, live, index, image }) => (
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
    onClick={() => window.open(live, '_blank')}
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
      <ProjectImage {...image} />
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
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
        >
            <Github size={22} />
        </motion.a>
        <motion.a 
            whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }}
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
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
      github: "https://github.com/aniketjadhao99/CyberZsec.git",
      live: "https://cyberzsec.com/",
      image: {
        title: "CYBERZSEC",
        icon: Shield,
        gradientStart: "#1a3a52",
        gradientEnd: "#0f1f3a"
      }
    },
    {
      title: "PRIYA CHAVAN MAKEUP",
      category: "HTML5 | CSS3 | JavaScript | GSAP | Framer Motion",
      github: "https://github.com/aniketjadhao99/Priya-Makeup-Artist.git",
      live: "https://priyachavanmakeupartist.in/",
      image: {
        title: "PRIYA CHAVAN MAKEUP",
        icon: Palette,
        gradientStart: "#3d1a2a",
        gradientEnd: "#1a0f17"
      }
    },
    {
      title: "CYBERZCOP",
      category: "React.js | Node.js | Tailwind CSS | GSAP | Web Security Protocols",
      github: "https://github.com/aniketjadhao99/CyberZcop.git",
      live: "https://cyberzsec.com/cyberzcop.html",
      image: {
        title: "CYBERZCOP",
        icon: Shield,
        gradientStart: "#2a1a3a",
        gradientEnd: "#0f0a1a"
      }
    },
    {
      title: "VITTHAL PHOTOS",
      category: "Premium Photo Frames & Heritage",
      github: "https://github.com/aniketjadhao99/Vitthal-Photos.git",
      live: "https://vitthalphotos.com/",
      image: {
        title: "VITTHAL PHOTOS",
        icon: Camera,
        gradientStart: "#1a2a3a",
        gradientEnd: "#0f151f"
      }
    },
    {
      title: "PORTFOLIO PROJECT",
      category: "React.js | Framer Motion | Responsive Design",
      github: "#",
      live: "https://aryash0412.github.io/portfolio/",
      image: {
        title: "PORTFOLIO PROJECT",
        icon: CodeSquare,
        gradientStart: "#2a1a3a",
        gradientEnd: "#1a0f2a"
      }
    },
    {
      title: "CYBERZTALK",
      category: "Web Platform | Features & Services",
      github: "https://github.com/aniketjadhao99/CYBERZTALK.git",
      live: "https://palegreen-llama-259442.hostingersite.com/features.html",
      image: {
        title: "CYBERZTALK",
        icon: MessageCircle,
        gradientStart: "#1a3a2a",
        gradientEnd: "#0f1a15"
      }
    }
  ];

  return (
    <section id="work" style={{ paddingTop: '160px', paddingBottom: '200px' }}>
       <style>{projectsGridStyles}</style>
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

          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={i} index={i} {...p} />
            ))}
          </div>
       </div>
    </section>
  );
};


export default Projects;
