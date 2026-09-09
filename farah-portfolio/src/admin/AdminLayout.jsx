import { useState } from "react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import authService from "../services/authService";

function AdminLayout() {
  const navigate = useNavigate();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  const user =
    authService.getStoredUser();


  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await authService.logout();
    } catch {
      /*
       * Even if the server request fails,
       * remove the local session.
       */
    } finally {
      authService.clearSession();

      navigate(
        "/admin/login",
        {
          replace: true,
        }
      );

      setLoggingOut(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Close Mobile Sidebar
  |--------------------------------------------------------------------------
  */

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <div className="admin-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        {/* BRAND */}

        <div className="admin-sidebar-top">

          <div className="admin-sidebar-brand">
            Farah<span>.</span>
          </div>

          <p>
            Portfolio Admin
          </p>

        </div>


        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="admin-sidebar-nav">

          {/* DASHBOARD */}

          <NavLink
            to="/admin/dashboard"
            onClick={closeSidebar}
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <span className="admin-nav-icon">
              ◈
            </span>

            Dashboard
          </NavLink>


          {/* MESSAGES */}

          <NavLink
            to="/admin/messages"
            onClick={closeSidebar}
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <span className="admin-nav-icon">
              ✉
            </span>

            Messages
          </NavLink>


          {/* PROJECTS */}

          <NavLink
            to="/admin/projects"
            onClick={closeSidebar}
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <span className="admin-nav-icon">
              ◫
            </span>

            Projects
          </NavLink>


          {/* CV */}

          <NavLink
            to="/admin/cv"
            onClick={closeSidebar}
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <span className="admin-nav-icon">
              ▤
            </span>

            CV
          </NavLink>


          {/* SETTINGS */}

          <NavLink
            to="/admin/settings"
            onClick={closeSidebar}
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            <span className="admin-nav-icon">
              ⚙
            </span>

            Settings
          </NavLink>

        </nav>


        {/* =========================
            USER + LOGOUT
        ========================= */}

        <div className="admin-sidebar-bottom">

          <div className="admin-sidebar-user">

            <div className="admin-user-avatar">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "A"}
            </div>


            <div>

              <strong>
                {user?.name ||
                  "Admin"}
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>


          <button
            type="button"
            className="admin-sidebar-logout"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut
              ? "Logging out..."
              : "Logout"}
          </button>

        </div>

      </aside>


      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="admin-main">

        {/* TOPBAR */}

        <header className="admin-topbar">

          <button
            type="button"
            className="admin-sidebar-toggle"
            onClick={() =>
              setSidebarOpen(
                (prev) => !prev
              )
            }
            aria-label="Toggle admin menu"
            aria-expanded={
              sidebarOpen
            }
          >
            ☰
          </button>


          <div>
            <p>
              Portfolio Administration
            </p>
          </div>


          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-view-portfolio"
          >
            View Portfolio ↗
          </a>

        </header>


        {/* PAGE */}

        <div className="admin-page">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;