import React, { useEffect, useState } from "react";
import Markers from "./Markers"; // Asegúrate de proporcionar la ruta correcta

const BarChart = ({ selectedQuestion, surveyId }) => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_DATA}/get/${surveyId}`
        );
        const data = await response.json();
        setResponseData(data.responses);
      } catch (error) {
        console.log("Error al obtener las respuestas:", error);
      }
    }
    fetchResponses();
  }, [surveyId]);

  const singleChoiceData = {
    labels: [],
    datasets: [
      {
        label: "Respuestas Single Choice",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const multipleChoiceData = {
    labels: [],
    datasets: [
      {
        label: "Respuestas Multiple Choice",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  responseData.forEach((response) => {
    response.forEach((item) => {
      const question = item.question;
      const type = question.type;
      const responseValue = item.response;

      if (type === "SINGLE_CHOICE") {
        if (!singleChoiceData.labels.includes(responseValue)) {
          singleChoiceData.labels.push(responseValue);
          singleChoiceData.datasets[0].data.push(1);
        } else {
          const index = singleChoiceData.labels.indexOf(responseValue);
          singleChoiceData.datasets[0].data[index]++;
        }
      } else if (type === "MULTIPLE_CHOICE") {
        responseValue.forEach((value) => {
          if (!multipleChoiceData.labels.includes(value)) {
            multipleChoiceData.labels.push(value);
            multipleChoiceData.datasets[0].data.push(1);
          } else {
            const index = multipleChoiceData.labels.indexOf(value);
            multipleChoiceData.datasets[0].data[index]++;
          }
        });
      }
    });
  });

  return (
    <div>
      <Markers selectedQuestion={selectedQuestion} surveyId={surveyId} />
      <div>
        <h2>Gráfica de Respuestas Single Choice</h2>
        <BarChart data={singleChoiceData} />
      </div>
      <div>
        <h2>Gráfica de Respuestas Multiple Choice</h2>
        <BarChart data={multipleChoiceData} />
      </div>
    </div>
  );
};

export default BarChart;
