import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import LoginPage from "../components/LoginPage";
import SurveyDetails from "../components/SurveyDetails";
import SurveyCreator from "../components/SurveyCreator";
import SurveyViewer from "../components/SurveyViewer/SurveyViewer";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de la ruta correcta

const ProtectedRoute = ({ children, path }) => {
  const { user, allowedRoutes } = useContext(AuthContext);

  const isAllowed = allowedRoutes.includes(path);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute path="/createsurvey">
            <Route element={<SurveyCreator />} />
          </ProtectedRoute>
        }
      />
      <Route path="/survey/:surveyId" element={<SurveyViewer />} />
      <Route path="/:surveyId" element={<SurveyDetails />} />
    </Routes>
  );
};

export default AppRouter;
