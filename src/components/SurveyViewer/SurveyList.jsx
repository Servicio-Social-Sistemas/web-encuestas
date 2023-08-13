import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/v1/surveys"
        );
        if (response.status === 200) {
          setSurveys(response.data);
        } else {
          console.error("Error fetching surveys:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h1>Lista de Encuestas</h1>
      {surveys.map((survey) => (
        <div key={survey.id}>
          <h2>{survey.name}</h2>
          <p>{survey.description}</p>
          <Link to={`/survey/${survey.id}`}>Responder Encuesta</Link>
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
