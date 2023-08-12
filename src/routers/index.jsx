import { Routes, Route } from "react-router-dom";

import Welcome from "../components/Welcome";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import SurveyDetails from "../components/SurveyDetails";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/:surveyId" element={<SurveyDetails />} />
    </Routes>
  );
};

export default AppRouter;
