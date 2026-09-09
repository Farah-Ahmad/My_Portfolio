import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Link,
} from "react-router-dom";

import dashboardService from "../services/dashboardService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    featured_projects: 0,
    messages: 0,
    unread_messages: 0,
    read_messages: 0,
  });

  const [
    recentMessages,
    setRecentMessages,
  ] = useState([]);

  const [
    recentProjects,
    setRecentProjects,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================
     FETCH DASHBOARD
  ========================= */

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await dashboardService.getDashboard();

        setStats(
          data.stats || {
            projects: 0,
            featured_projects: 0,
            messages: 0,
            unread_messages: 0,
            read_messages: 0,
          }
        );

        setRecentMessages(
          data.recent_messages || []
        );

        setRecentProjects(
          data.recent_projects || []
        );
      } catch (error) {
        /*
         * 401 / 403 are handled
         * automatically by api.js.
         */

        if (
          error.response?.status !== 401 &&
          error.response?.status !== 403
        ) {
          setError(
            "Could not load dashboard data."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* =========================
     DATE
  ========================= */

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(
      date
    ).toLocaleDateString();
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="admin-dashboard">

        <div className="admin-dashboard-loading">
          Loading dashboard...
        </div>

      </main>
    );
  }

  return (
    <main className="admin-dashboard">

      <section className="admin-content">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          className="admin-dashboard-heading"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >

          <div>

            <p className="section-label">
              Overview
            </p>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage your portfolio,
              projects, and contact
              messages.
            </p>

          </div>


          <div className="admin-dashboard-actions">

            <Link
              to="/admin/projects/new"
              className="admin-dashboard-primary"
            >
              + Add Project
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="admin-dashboard-secondary"
            >
              View Portfolio ↗
            </a>

          </div>

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
            STATS
        ========================= */}

        <div className="admin-dashboard-stats">

          <motion.div
            className="dashboard-stat-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.05,
            }}
          >

            <span>
              Total Projects
            </span>

            <strong>
              {stats.projects}
            </strong>

            <p>
              {stats.featured_projects} visible
            </p>

          </motion.div>


          <motion.div
            className="dashboard-stat-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
          >

            <span>
              Messages
            </span>

            <strong>
              {stats.messages}
            </strong>

            <p>
              Contact submissions
            </p>

          </motion.div>


          <motion.div
            className="dashboard-stat-card highlight"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
          >

            <span>
              Unread
            </span>

            <strong>
              {stats.unread_messages}
            </strong>

            <p>
              Need your attention
            </p>

          </motion.div>


          <motion.div
            className="dashboard-stat-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
          >

            <span>
              Read
            </span>

            <strong>
              {stats.read_messages}
            </strong>

            <p>
              Processed messages
            </p>

          </motion.div>

        </div>


        {/* =========================
            DASHBOARD CONTENT
        ========================= */}

        <div className="admin-dashboard-grid">

          {/* =========================
              RECENT MESSAGES
          ========================= */}

          <motion.div
            className="dashboard-panel"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
          >

            <div className="dashboard-panel-header">

              <div>

                <span>
                  Inbox
                </span>

                <h2>
                  Recent Messages
                </h2>

              </div>

              <Link to="/admin/messages">
                View All →
              </Link>

            </div>


            {recentMessages.length === 0 ? (

              <div className="dashboard-empty">
                No messages yet.
              </div>

            ) : (

              <div className="dashboard-message-list">

                {recentMessages.map(
                  (message) => (

                    <Link
                      to="/admin/messages"
                      className={`dashboard-message-row ${
                        !message.is_read
                          ? "unread"
                          : ""
                      }`}
                      key={message.id}
                    >

                      <div className="dashboard-message-info">

                        <div className="dashboard-message-name">

                          {!message.is_read && (
                            <span className="unread-dot" />
                          )}

                          {message.name}

                        </div>

                        <strong>
                          {message.subject ||
                            "No subject"}
                        </strong>

                        <p>
                          {message.message}
                        </p>

                      </div>


                      <span className="dashboard-date">
                        {formatDate(
                          message.created_at
                        )}
                      </span>

                    </Link>

                  )
                )}

              </div>

            )}

          </motion.div>


          {/* =========================
              RECENT PROJECTS
          ========================= */}

          <motion.div
            className="dashboard-panel"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
            }}
          >

            <div className="dashboard-panel-header">

              <div>

                <span>
                  Portfolio
                </span>

                <h2>
                  Recent Projects
                </h2>

              </div>

              <Link to="/admin/projects">
                Manage →
              </Link>

            </div>


            {recentProjects.length === 0 ? (

              <div className="dashboard-empty">
                No projects yet.
              </div>

            ) : (

              <div className="dashboard-project-list">

                {recentProjects.map(
                  (project) => (

                    <div
                      className="dashboard-project-row"
                      key={project.id}
                    >

                      <div>

                        <span className="dashboard-project-type">
                          {project.type}
                        </span>

                        <h3>
                          {project.title}
                        </h3>

                        <p>
                          {project.short_description}
                        </p>

                      </div>


                      <div className="dashboard-project-actions">

                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                        >
                          Edit
                        </Link>

                        {project.slug && (
                          <a
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View ↗
                          </a>
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </motion.div>

        </div>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <motion.div
          className="dashboard-quick-actions"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
        >

          <div className="dashboard-quick-heading">

            <span>
              Quick Actions
            </span>

            <h2>
              Manage your portfolio
            </h2>

          </div>


          <div className="dashboard-quick-grid">

            <Link
              to="/admin/projects/new"
              className="dashboard-quick-card"
            >
              <span>
                +
              </span>

              <div>
                <strong>
                  Add Project
                </strong>

                <p>
                  Create a new portfolio project.
                </p>
              </div>
            </Link>


            <Link
              to="/admin/messages"
              className="dashboard-quick-card"
            >
              <span>
                ✉
              </span>

              <div>
                <strong>
                  Open Inbox
                </strong>

                <p>
                  Review contact messages.
                </p>
              </div>
            </Link>


            <Link
              to="/admin/cv"
              className="dashboard-quick-card"
            >
              <span>
                ▤
              </span>

              <div>
                <strong>
                  Manage CV
                </strong>

                <p>
                  Upload or replace your CV.
                </p>
              </div>
            </Link>


            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="dashboard-quick-card"
            >
              <span>
                ↗
              </span>

              <div>
                <strong>
                  View Portfolio
                </strong>

                <p>
                  Open your public website.
                </p>
              </div>
            </a>

          </div>

        </motion.div>

      </section>

    </main>
  );
}

export default AdminDashboard;