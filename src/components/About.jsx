import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Target, BookOpen } from 'lucide-react';
import AboutImage from '../assets/About.png';
import SkillsImage from '../assets/skills.png';

const About = () => {
  const aboutInfo = [
    {
      title: "Who Am I",
      description: "I am Aniket Jadhao, a Full-Stack Developer and Digital Architect. As a freelance consultant, I transform traditional businesses into powerful, custom-built digital platforms."
    },
    {
      title: "My Philosophy",
      description: "I prioritize custom-engineered systems over templates. Using PHP, Node.js, and PostgreSQL, I build secure, scalable code designed to stay relevant for the next decade of tech."
    },
    {
      title: "My Focus",
      description: "I specialize in complex web ecosystems and data integrity. From secure examination systems to cybersecurity, I am now scaling my expertise toward AI and Data Science to build the intelligent applications of tomorrow."
    }
  ];

  const skills = [
    {
      category: "Frontend",
      items: ["React.js", "Vue.js", "Next.js", "Tailwind CSS"],
      icon: Code2
    },
    {
      category: "3D & Animation",
      items: ["Three.js", "Babylon.js", "Framer Motion", "GSAP"],
      icon: Zap
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB", "Firebase"],
      icon: Target
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "Docker", "Webpack", "Vite"],
      icon: BookOpen
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <>
      <section id="about" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 243, 255, 0.1)'
      }}>
        <div className="container about-grid-container" style={{
          display: 'grid',
          alignItems: 'center',
        }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
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
                  About Me
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                marginBottom: '40px',
                fontWeight: '900',
                color: 'var(--text-primary)',
                lineHeight: '1.2',
                textAlign: 'left'
              }}
            >
              Crafting<br />
              <span style={{
                background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Digital Futures
              </span>
            </motion.h2>

            <motion.div variants={itemVariants} className="mobile-only-img" style={{ marginBottom: '40px' }}>
              <img
                src={AboutImage}
                alt="About"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  border: '1px solid rgba(188, 19, 254, 0.2)',
                  boxShadow: '0 10px 40px rgba(188, 19, 254, 0.1)'
                }}
              />
            </motion.div>

            {aboutInfo.map((item, index) => (
              <motion.div key={index} variants={itemVariants} style={{ marginBottom: '30px', textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--accent-purple)',
                  marginBottom: '12px',
                  letterSpacing: '1px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  letterSpacing: '0.3px'
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="desktop-only-img"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={AboutImage}
              alt="About"
              style={{
                width: '100%',
                maxWidth: '550px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px',
                border: '1px solid rgba(188, 19, 254, 0.2)',
                boxShadow: '0 10px 40px rgba(188, 19, 254, 0.1)'
              }}
            />
          </motion.div>
        </div>

        <style>{`
          .about-grid-container {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            max-width: 1300px;
          }
          @media (max-width: 768px) {
            .about-grid-container {
              grid-template-columns: 1fr;
              gap: 40px;
              max-width: 100%;
            }
            .desktop-only-img {
              display: none !important;
            }
            .mobile-only-img {
              display: flex !important;
              justify-content: center;
              width: 100%;
            }
          }
          .mobile-only-img {
            display: none;
          }
        `}</style>
      </section>

      <section id="skills" style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 0',
        position: 'relative',
        borderTop: '1px solid rgba(188, 19, 254, 0.1)'
      }}>
        <div className="container skills-grid-container" style={{
          display: 'grid',
          alignItems: 'center',
        }}>
          <motion.div
            className="desktop-only-img"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <img
              src={SkillsImage}
              alt="Skills"
              style={{
                width: '100%',
                maxWidth: '550px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px',
                border: '1px solid rgba(188, 19, 254, 0.2)',
                boxShadow: '0 10px 40px rgba(188, 19, 254, 0.1)'
              }}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.div
              variants={itemVariants}
              style={{ textAlign: 'center', width: '100%' }}
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
                  My Skills
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                marginBottom: '50px',
                fontWeight: '900',
                color: 'var(--text-primary)',
                lineHeight: '1.2',
                textAlign: 'center'
              }}>
                Expertise<br />
                <span style={{
                  background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Stack
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="mobile-only-img" style={{ marginBottom: '40px', width: '100%' }}>
              <img
                src={SkillsImage}
                alt="Skills"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  border: '1px solid rgba(188, 19, 254, 0.2)',
                  boxShadow: '0 10px 40px rgba(188, 19, 254, 0.1)'
                }}
              />
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto',
              padding: '0 10px',
              boxSizing: 'border-box'
            }}>
              {skills.map((skillGroup, index) => {
                const Icon = skillGroup.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      borderColor: 'rgba(188, 19, 254, 0.5)',
                      transform: 'translateY(-5px)'
                    }}
                    style={{
                      padding: 'clamp(10px, 2vw, 25px)',
                      border: '1px solid rgba(188, 19, 254, 0.2)',
                      borderRadius: '12px',
                      background: 'rgba(188, 19, 254, 0.02)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <Icon size={22} style={{ color: 'var(--accent-purple)' }} />
                      <h3 style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                        fontWeight: '800',
                        color: 'var(--accent-cyan)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {skillGroup.category}
                      </h3>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {skillGroup.items.map((skill, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                            color: 'var(--text-secondary)',
                            paddingLeft: '10px',
                            borderLeft: '2px solid var(--accent-purple)',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.color = 'var(--accent-cyan)';
                            e.target.style.paddingLeft = '16px';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = 'var(--text-secondary)';
                            e.target.style.paddingLeft = '10px';
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <style>{`
          .skills-grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            max-width: 1300px;
            margin: 0 auto;
          }
          @media (max-width: 768px) {
            .skills-grid-container {
              grid-template-columns: 1fr;
              gap: 40px;
              padding: 0 15px;
            }
            .desktop-only-img {
              display: none !important;
            }
            .mobile-only-img {
              display: flex !important;
              justify-content: center;
              width: 100%;
            }
          }
          .mobile-only-img {
            display: none;
          }
        `}</style>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default About;
