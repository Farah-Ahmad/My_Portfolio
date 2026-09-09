import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import projectService from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await projectService.getProjects();

        setProjects(
          response.data || []
        );
      } catch (error) {
        console.error(error);

        setError(
          "Projects could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      className="projects section"
      id="projects"
    >
      <div className="section-container">

        <motion.div
          className="section-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        >
          <p className="section-label">
            Featured Projects
          </p>

          <h2>
            Projects where I turn
            <span>
              {" "}
              ideas into working software.
            </span>
          </h2>
        </motion.div>


        {loading && (
          <div className="projects-status">
            Loading projects...
          </div>
        )}


        {error && (
          <div className="projects-error">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="projects-status">
              No projects available yet.
            </div>
          )}


        {!loading &&
          !error &&
          projects.length > 0 && (

            <div className="projects-list">

              {projects.map(
                (project, index) => (

                  <motion.article
                    className="project-card"
                    key={project.id}
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay:
                        index * 0.12,
                      ease: "easeOut",
                    }}
                    viewport={{
                      once: true,
                    }}
                  >

                    <div className="project-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>


                    <div className="project-content">

                      <p className="project-type">
                        {project.type}
                      </p>


                      <h3>
                        {project.title}
                      </h3>


                      <p className="project-description">
                        {
                          project.short_description
                        }
                      </p>


                      <div className="project-technologies">

                        {project.technologies
                          ?.slice(0, 6)
                          .map(
                            (technology) => (

                              <motion.span
                                key={
                                  technology
                                }
                                whileHover={{
                                  y: -2,
                                  scale: 1.03,
                                }}
                                transition={{
                                  duration: 0.2,
                                }}
                              >
                                {
                                  technology
                                }
                              </motion.span>

                            )
                          )}

                      </div>

                    </div>


                    <div className="project-features">

                      <p className="features-title">
                        Key Features
                      </p>


                      <ul>

                        {project.features
                          ?.slice(0, 6)
                          .map(
                            (feature) => (

                              <li
                                key={
                                  feature
                                }
                              >
                                {
                                  feature
                                }
                              </li>

                            )
                          )}

                      </ul>


                      <motion.div
                        whileHover={{
                          x: 5,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        <Link
                          to={`/projects/${project.slug}`}
                          className="project-button"
                        >
                          View Project

                          <span>
                            →
                          </span>
                        </Link>
                      </motion.div>

                    </div>

                  </motion.article>

                )
              )}

            </div>

          )}

      </div>
    </section>
  );
}

export default Projects;