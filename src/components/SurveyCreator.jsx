import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Stack,
} from "@chakra-ui/react";

const SurveyCreator = () => {
  const [questions, setQuestions] = useState([{ question: "", type: "SINGLE_CHOICE", options: [] }]);
  const [selectedType, setSelectedType] = useState("SINGLE_CHOICE"); // Selected question type
  const [surveyName, setSurveyName] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");

  const handleNameChange = (value) => {
    setSurveyName(value);
  };

  const handleDescriptionChange = (value) => {
    setSurveyDescription(value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", type: selectedType, options: [] }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCreateSurvey = async () => {
    try {
      const surveyData = {
        name: surveyName,
        description: surveyDescription,
        questions: questions.map((questionData) => ({
          id: questionData.id, // Assign a unique identifier for each question
          question: questionData.question,
          type: questionData.type,
          options: questionData.options,
        })),
      };

      const response = await fetch("http://localhost:3001/api/v1/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        console.log("Survey data saved successfully!");
      } else {
        console.error("Error saving survey data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel>Survey Name:</FormLabel>
        <Input
          type="text"
          value={surveyName}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Survey Description:</FormLabel>
        <Textarea
          value={surveyDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Question Type:</FormLabel>
        <label>
          <input
            type="radio"
            value="SINGLE_CHOICE"
            checked={selectedType === "SINGLE_CHOICE"}
            onChange={() => setSelectedType("SINGLE_CHOICE")}
          />
          Single Choice
        </label>
        <label>
          <input
            type="radio"
            value="MULTIPLE_CHOICE"
            checked={selectedType === "MULTIPLE_CHOICE"}
            onChange={() => setSelectedType("MULTIPLE_CHOICE")}
          />
          Multiple Choice
        </label>
        <label>
          <input
            type="radio"
            value="OPEN_ENDED"
            checked={selectedType === "OPEN_ENDED"}
            onChange={() => setSelectedType("OPEN_ENDED")}
          />
          Open-ended
        </label>
      </FormControl>

      {questions.map((questionData, questionIndex) => (
        <FormControl key={questionIndex}>
          <FormLabel>Question {questionIndex + 1}:</FormLabel>
          <Input
            type="text"
            value={questionData.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />
          <FormLabel>Options:</FormLabel>
          <Stack spacing={2}>
            {questionData.options.map((option, optionIndex) => (
              <Input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
              />
            ))}
            <Button
              mt={2}
              size="sm"
              onClick={() => handleAddOption(questionIndex)}
            >
              Add Option
            </Button>
          </Stack>
        </FormControl>
      ))}

      <Button mt={4} onClick={handleAddQuestion}>
        Add Question
      </Button>

      <Button mt={4} colorScheme="blue" onClick={handleCreateSurvey}>
        Save Survey
      </Button>
    </Box>
  );
};

export default SurveyCreator;