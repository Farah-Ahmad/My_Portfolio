import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import projectService from "../services/projectService";


function AdminProjects() {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [lastPage, setLastPage] =
    useState(1);


  /*
  |--------------------------------------------------------------------------
  | Fetch Projects
  |--------------------------------------------------------------------------
  |
  | Used after the initial load for
  | pagination and refreshing the list
  | after deleting a project.
  |
  */

  const fetchProjects = async (
    page = 1
  ) => {
    setLoading(true);

    setError("");


    try {
      const data =
        await projectService
          .getAdminProjects(
            page
          );


      setProjects(
        data.data || []
      );


      setCurrentPage(
        data.current_page || 1
      );


      setLastPage(
        data.last_page || 1
      );
    } catch (error) {
      /*
       * 401 / 403 are handled
       * automatically by api.js.
       */

      if (
        error.response?.status !==
          401 &&
        error.response?.status !==
          403
      ) {
        setError(
          "Could not load projects."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  |
  | Initial loading is handled directly
  | inside the effect so we do not call
  | a function that synchronously updates
  | state from the effect body.
  |
  */

  useEffect(() => {
    let cancelled = false;


    const loadInitialProjects =
      async () => {
        try {
          const data =
            await projectService
              .getAdminProjects(1);


          if (cancelled) {
            return;
          }


          setProjects(
            data.data || []
          );


          setCurrentPage(
            data.current_page || 1
          );


          setLastPage(
            data.last_page || 1
          );
        } catch (error) {
          if (cancelled) {
            return;
          }


          /*
           * 401 / 403 are handled
           * automatically by api.js.
           */

          if (
            error.response?.status !==
              401 &&
            error.response?.status !==
              403
          ) {
            setError(
              "Could not load projects."
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };


    loadInitialProjects();


    return () => {
      cancelled = true;
    };
  }, []);


  /*
  |--------------------------------------------------------------------------
  | Delete Project
  |--------------------------------------------------------------------------
  */

  const deleteProject = async (
    project
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${project.title}"?`
      );


    if (!confirmed) {
      return;
    }


    setDeletingId(
      project.id
    );

    setError("");


    try {
      await projectService
        .deleteProject(
          project.id
        );


      /*
       * If we delete the only project
       * on a page other than page 1,
       * go back one page.
       */

      const shouldGoBack =
        projects.length === 1 &&
        currentPage > 1;


      const pageToLoad =
        shouldGoBack
          ? currentPage - 1
          : currentPage;


      await fetchProjects(
        pageToLoad
      );
    } catch (error) {
      if (
        error.response?.status !==
          401 &&
        error.response?.status !==
          403
      ) {
        setError(
          "Could not delete project."
        );
      }
    } finally {
      setDeletingId(null);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <main className="admin-dashboard">

      <section className="admin-content">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          className="admin-page-heading"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div>

            <p className="section-label">
              Portfolio
            </p>


            <h1>
              Projects
            </h1>


            <p>
              Manage the projects displayed
              on your portfolio.
            </p>

          </div>


          <Link
            to="/admin/projects/new"
            className="admin-add-project"
          >
            + Add Project
          </Link>

        </motion.div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="admin-dashboard-error">
            {error}
          </div>
        )}


        {/* =========================
            PROJECTS CARD
        ========================= */}

        <div className="admin-projects-card">

          {loading ? (

            <div className="admin-empty">
              Loading projects...
            </div>

          ) : projects.length === 0 ? (

            <div className="admin-empty">

              <h3>
                No projects yet
              </h3>


              <p>
                Add your first project to
                the portfolio.
              </p>

            </div>

          ) : (

            <div className="admin-projects-list">

              {projects.map(
                (
                  project,
                  index
                ) => (

                  <motion.div
                    className="admin-project-row"
                    key={
                      project.id
                    }
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.04,
                    }}
                  >

                    {/* =========================
                        PROJECT INFO
                    ========================= */}

                    <div className="admin-project-main">

                      <div className="admin-project-order">

                        {String(
                          project.sort_order ??
                            index + 1
                        ).padStart(
                          2,
                          "0"
                        )}

                      </div>


                      <div>

                        <span className="admin-project-type">
                          {project.type}
                        </span>


                        <h3>
                          {project.title}
                        </h3>


                        <p>
                          {
                            project.short_description
                          }
                        </p>


                        <div className="admin-project-tech">

                          {project.technologies
                            ?.slice(
                              0,
                              5
                            )
                            .map(
                              (
                                technology
                              ) => (

                                <span
                                  key={
                                    technology
                                  }
                                >
                                  {
                                    technology
                                  }
                                </span>

                              )
                            )}

                        </div>

                      </div>

                    </div>


                    {/* =========================
                        STATUS
                    ========================= */}

                    <div className="admin-project-status">

                      <span
                        className={
                          project.is_featured
                            ? "featured"
                            : "hidden"
                        }
                      >
                        {project.is_featured
                          ? "Visible"
                          : "Hidden"}
                      </span>

                    </div>


                    {/* =========================
                        ACTIONS
                    ========================= */}

                    <div className="admin-project-actions">

                      {project.is_featured ? (

                        <Link
                          to={`/projects/${project.slug}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </Link>

                      ) : (

                        <span className="admin-project-hidden-view">
                          Hidden
                        </span>

                      )}


                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="edit"
                      >
                        Edit
                      </Link>


                      <button
                        type="button"
                        disabled={
                          deletingId !== null ||
                          loading
                        }
                        onClick={() =>
                          deleteProject(
                            project
                          )
                        }
                      >
                        {deletingId ===
                        project.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )}


          {/* =========================
              PAGINATION
          ========================= */}

          {!loading &&
            lastPage > 1 && (

            <div className="admin-pagination">

              <button
                type="button"
                disabled={
                  currentPage === 1 ||
                  deletingId !== null
                }
                onClick={() =>
                  fetchProjects(
                    currentPage - 1
                  )
                }
              >
                ← Previous
              </button>


              <span>
                Page {currentPage} of{" "}
                {lastPage}
              </span>


              <button
                type="button"
                disabled={
                  currentPage ===
                    lastPage ||
                  deletingId !== null
                }
                onClick={() =>
                  fetchProjects(
                    currentPage + 1
                  )
                }
              >
                Next →
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}


export default AdminProjects;