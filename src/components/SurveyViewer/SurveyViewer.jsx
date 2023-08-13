import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SurveyViewer = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [userResponses, setUserResponses] = useState({});

  let { surveyId } = useParams();

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_DATA}/get/${surveyId}`
        );

        console.log(response);

        if (response.status === 200) {
          setSurveyData(response.data);
        } else {
          console.error("Error fetching survey data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  const handleResponseChange = (questionIndex, response) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: response,
    }));
  };

  const handleSaveResponses = async () => {
    try {
      const userSurveyResponses = surveyData.questions.map(
        (question, questionIndex) => {
          if (question.type === "OPEN_ENDED") {
            return {
              question: question.question,
              response: [userResponses[questionIndex] || ""], // Almacenar la respuesta en un array
            };
          } else {
            return {
              question: question.question,
              response: userResponses[questionIndex] || "",
            };
          }
        }
      );

      const response = await axios.post(
        `http://localhost:9090/api/v1/save/${surveyId}`,
        { responses: userSurveyResponses }
      );

      if (response.status === 200) {
        console.log("Respuestas guardadas exitosamente!");
      } else {
        console.error("Error al guardar las respuestas:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!surveyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{surveyData.name}</h1>
      <p>{surveyData.description}</p>
      {surveyData.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h2>
            Pregunta {questionIndex + 1}: {question.question}
          </h2>
          <p>Tipo de Pregunta: {question.type}</p>
          {question.type !== "OPEN_ENDED" ? (
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type={
                      question.type === "SINGLE_CHOICE" ? "radio" : "checkbox"
                    }
                    value={option}
                    checked={userResponses[questionIndex] === option}
                    onChange={(e) =>
                      handleResponseChange(questionIndex, e.target.value)
                    }
                  />
                  {option}
                </li>
              ))}
            </ul>
          ) : (
            <input
              type="text"
              value={userResponses[questionIndex] || ""}
              onChange={(e) =>
                handleResponseChange(questionIndex, e.target.value)
              }
            />
          )}
        </div>
      ))}
      <button onClick={handleSaveResponses}>Guardar Respuestas</button>
    </div>
  );
};

export default SurveyViewer;
