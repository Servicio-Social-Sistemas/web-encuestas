import { Routes, Route } from "react-router-dom";

import Welcome from "../components/Welcome";
import LoginPage from "../components/LoginPage";
import SurveyDetails from "../components/SurveyDetails";
import SurveyCreator from "../components/SurveyCreator";
import SurveyViewer from "../components/SurveyViewer/SurveyViewer";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/createsurvey" element={<SurveyCreator />} />
      <Route path="/survey/:surveyId" element={<SurveyViewer />} />
      <Route path="/:surveyId" element={<SurveyDetails />} />
    </Routes>
  );
};

export default AppRouter;
