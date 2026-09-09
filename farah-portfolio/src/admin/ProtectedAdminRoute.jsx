import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import authService from "../services/authService";

function ProtectedAdminRoute({ children }) {
  const [status, setStatus] = useState(
    "checking"
  );

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = authService.getToken();

      if (!token) {
        setStatus("unauthorized");
        return;
      }

      try {
        const data =
          await authService.getCurrentAdmin();

        if (!data?.user?.is_admin) {
          authService.clearSession();

          setStatus("unauthorized");

          return;
        }

        setStatus("authorized");
      } catch {
        authService.clearSession();

        setStatus("unauthorized");
      }
    };

    verifyAdmin();
  }, []);

  if (status === "checking") {
    return (
      <div className="admin-route-loading">
        <div className="admin-route-spinner"></div>

        <p>
          Checking authentication...
        </p>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedAdminRoute;