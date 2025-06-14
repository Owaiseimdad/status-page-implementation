// src/routes/index.jsx
import { Route, Routes as LibRoutes, Navigate } from "react-router";
import ProtectedRoute from "../components/protected-page";

// Auth Pages
import SignInPage from "../pages/auth/sign-in";
import SignUpPage from "../pages/auth/sign-up";

// App Pages
import NotFound from "../pages/not-found";
import StatusPage from "../pages/status-page";

// Layout
import AppLayout from "../components/app-layout";
import StatusCreatePage from "../pages/status-page/create";
import StatusPageDetails from "../pages/status-page/details";
import SettingsPage from "../pages/settings";

const Routes = () => {
  return (
    <LibRoutes>
      {/* Auth Routes */}
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />


      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SettingsPage to="/settings" />
            </AppLayout>
          </ProtectedRoute>
        }
      />



      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Navigate to="/status" />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/status"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StatusPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

       <Route
        path="/status/create"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StatusCreatePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/status/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StatusPageDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </LibRoutes>
  );
};

export default Routes;
