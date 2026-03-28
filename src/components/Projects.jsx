import React from 'react';
import { motion } from 'framer-motion';
import { Github, CodeSquare, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, category, github, live, index }) => (
  <a
    href={live !== '#' ? live : undefined}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        rotateY: 3,
        rotateX: -3,
        transition: { duration: 0.3 }
      }}
      className="glass project-card"
      style={{
        padding: '20px',
        height: '100%',
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        cursor: live !== '#' ? 'pointer' : 'default'
      }}
    >
      {/* Thumbnail area */}
      <div className="project-thumb">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <CodeSquare size={52} className="glow-text" style={{ opacity: 0.4 }} />
        </motion.div>

        {/* Scanning line */}
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
          background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.9))'
        }} />
      </div>

      {/* Card footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ transform: 'translateZ(20px)', flex: 1, minWidth: 0 }}>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-futuristic)',
            color: 'var(--accent-purple)',
            fontWeight: '900',
            letterSpacing: '1.5px',
            display: 'block',
            wordBreak: 'break-word'
          }}>
            {category}
          </span>
          <h3 className="project-title">{title}</h3>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <motion.a
            whileHover={{ scale: 1.2, color: 'var(--accent-pink)' }}
            href={github !== '#' ? github : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s', cursor: github !== '#' ? 'pointer' : 'default' }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }}
            href={live !== '#' ? live : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s', cursor: live !== '#' ? 'pointer' : 'default' }}
          >
            <ArrowUpRight size={20} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  </a>
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
      live: "#"
    }
  ];

  return (
    <section id="work" className="work-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="work-header"
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(108, 142, 191, 0.05)',
            padding: '10px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(108, 142, 191, 0.2)',
            marginBottom: '30px',
            backdropFilter: 'blur(20px)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-cyan)',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              color: 'var(--accent-cyan)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Works
            </span>
          </div>
          <h2 className="work-heading">
            SELECTED <span className="gradient-text">SYSTEMS</span>
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
            marginTop: '16px'
          }} />
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={i} index={i} {...p} />
          ))}
        </div>
      </div>

      <style>{`
        .work-section {
          padding-top: 120px;
          padding-bottom: 160px;
        }

        .work-header {
          margin-bottom: 70px;
        }

        .work-heading {
          font-size: clamp(2rem, 6vw, 4rem);
          letter-spacing: clamp(2px, 1vw, 6px);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        .project-thumb {
          width: 100%;
          height: 220px;
          background: var(--bg-secondary);
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--glass-border);
          position: relative;
          overflow: hidden;
        }

        .project-title {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          margin: 8px 0 0;
          letter-spacing: 1px;
          word-break: break-word;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .work-section {
            padding-top: 80px;
            padding-bottom: 100px;
          }

          .work-header {
            margin-bottom: 50px;
          }

          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .project-thumb {
            height: 180px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .work-section {
            padding-top: 60px;
            padding-bottom: 80px;
          }

          .work-header {
            margin-bottom: 36px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .project-thumb {
            height: 160px;
            margin-bottom: 16px;
          }

          .project-card {
            padding: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
