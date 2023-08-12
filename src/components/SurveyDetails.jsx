import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for routing
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const SurveyDetails = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/get/${surveyId}`);
        console.log(response);
        console.log(surveyId);
        if (response.ok) {
          const surveyData = await response.json();
          setSurvey(surveyData);
        } else {
          console.error("Error fetching survey data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4}>
      <Heading>{survey.name}</Heading>
      <Text>{survey.description}</Text>
    </Box>
  );
};

export default SurveyDetails;