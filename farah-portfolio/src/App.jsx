import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminMessages from "./admin/AdminMessages";
import AdminProjects from "./admin/AdminProjects";
import AdminProjectForm from "./admin/AdminProjectForm";
import AdminCv from "./admin/AdminCv";
import AdminSettings from "./admin/AdminSettings";

import "./index.css";

function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/projects/:slug"
        element={<ProjectDetails />}
      />


      {/* =========================
          ADMIN LOGIN
      ========================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================
          PROTECTED ADMIN ROUTES
      ========================= */}

      <Route
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/messages"
          element={<AdminMessages />}
        />

        <Route
          path="/admin/projects"
          element={<AdminProjects />}
        />

        <Route
          path="/admin/projects/new"
          element={<AdminProjectForm />}
        />

        <Route
          path="/admin/projects/:id/edit"
          element={<AdminProjectForm />}
        />

        <Route
          path="/admin/cv"
          element={<AdminCv />}
        />

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />

      </Route>

    </Routes>
  );
}

export default App;