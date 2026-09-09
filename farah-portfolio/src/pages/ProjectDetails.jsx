import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import projectService from "../services/projectService";

function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [notFound, setNotFound] = useState(false);

  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Fetch Project
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      setError("");

      setNotFound(false);

      try {
        const response = await projectService.getProjectBySlug(slug);

        setProject(response.data || response);
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          setError("The project could not be loaded.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} | Farah Ahmad`;
    }

    return () => {
      document.title = "Farah Ahmad | Full Stack Web Developer";
    };
  }, [project]);
  /*
  |--------------------------------------------------------------------------
  | Close Lightbox With ESC
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="project-loading-page">
        <p>Loading project...</p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Not Found
  |--------------------------------------------------------------------------
  */

  if (notFound) {
    return (
      <div className="project-not-found">
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          Project Not Found
        </motion.h1>

        <Link to="/#projects">← Back to Projects</Link>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error || !project) {
    return (
      <div className="project-not-found">
        <h1>Something went wrong</h1>

        <p>{error}</p>

        <Link to="/#projects">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <>
      <main className="project-details">
        {/* =========================
            HERO
        ========================= */}

        <section className="project-details-hero">
          <motion.div
            className="project-details-container"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <Link to="/#projects" className="back-link">
              ← Back to Projects
            </Link>

            <p className="project-details-type">{project.type}</p>

            <h1>{project.title}</h1>

            <p className="project-details-description">{project.description}</p>

            <div className="project-details-technologies">
              {project.technologies?.map((technology) => (
                <motion.span
                  key={technology}
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                >
                  {technology}
                </motion.span>
              ))}
            </div>

            {(project.github || project.live_demo) && (
              <div className="project-details-actions">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-primary"
                  >
                    View GitHub
                  </a>
                )}

                {project.live_demo && (
                  <a
                    href={project.live_demo}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-secondary"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </section>

        {/* =========================
            FEATURES
        ========================= */}

        {project.features?.length > 0 && (
          <section className="project-details-section">
            <div className="project-details-container">
              <div className="project-detail-grid">
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                >
                  <p className="section-label">Project Overview</p>

                  <h2>Key Features</h2>
                </motion.div>

                <div className="project-detail-list">
                  {project.features.map((feature, index) => (
                    <motion.div
                      className="detail-list-item"
                      key={`${feature}-${index}`}
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      viewport={{
                        once: true,
                      }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <p>{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            FRONTEND
        ========================= */}

        {project.frontend?.length > 0 && (
          <section className="project-details-section project-alt">
            <div className="project-details-container">
              <div className="project-detail-grid">
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                >
                  <p className="section-label">Frontend</p>

                  <h2>User Interface Development</h2>
                </motion.div>

                <div className="project-detail-list">
                  {project.frontend.map((item, index) => (
                    <motion.div
                      className="detail-list-item"
                      key={`${item}-${index}`}
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      viewport={{
                        once: true,
                      }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <p>{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            BACKEND
        ========================= */}

        {project.backend?.length > 0 && (
          <section className="project-details-section">
            <div className="project-details-container">
              <div className="project-detail-grid">
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                >
                  <p className="section-label">Backend</p>

                  <h2>Server & API Development</h2>
                </motion.div>

                <div className="project-detail-list">
                  {project.backend.map((item, index) => (
                    <motion.div
                      className="detail-list-item"
                      key={`${item}-${index}`}
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      viewport={{
                        once: true,
                      }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <p>{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            DATABASE
        ========================= */}

        {project.database_tables?.length > 0 && (
          <section className="project-details-section project-alt">
            <div className="project-details-container">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                <p className="section-label">Database</p>

                <h2 className="database-title">Data Structure</h2>
              </motion.div>

              <div className="database-grid">
                {project.database_tables.map((table, index) => (
                  <motion.div
                    className="database-card"
                    key={`${table}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    viewport={{
                      once: true,
                    }}
                  >
                    {table}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================
            PROJECT GALLERY
        ========================= */}

        {project.images?.length > 0 && (
          <section className="project-details-section">
            <div className="project-details-container">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                <p className="section-label">Project Gallery</p>

                <h2 className="gallery-title">Application Screens</h2>
              </motion.div>

              <div className="project-gallery">
                {project.images.map((image, index) => (
                  <motion.button
                    type="button"
                    className="project-screenshot"
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    viewport={{
                      once: true,
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`${project.title} screenshot ${index + 1}`}
                      loading="lazy"
                    />

                    <div className="project-screenshot-overlay">
                      <span>View Screenshot</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================
            BOTTOM
        ========================= */}

        <section className="project-next">
          <motion.div
            className="project-details-container"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p>Want to see more?</p>

            <Link to="/#projects">Explore Other Projects →</Link>
          </motion.div>
        </section>
      </main>

      {/* =========================
          IMAGE LIGHTBOX
      ========================= */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="project-lightbox"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="project-lightbox-content"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="project-lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close screenshot"
              >
                ✕
              </button>

              <img
                src={selectedImage.url}
                alt={`${project.title} screenshot`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectDetails;
