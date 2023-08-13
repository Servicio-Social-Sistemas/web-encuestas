import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Stack,
  Flex,
  Select,
  Toast,
} from "@chakra-ui/react";

const SurveyCreator = () => {
  const [questions, setQuestions] = useState([
    { question: "", type: "SINGLE_CHOICE", options: [] },
  ]);
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
    setQuestions([
      ...questions,
      { question: "", type: selectedType, options: [] },
    ]);
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

  const handleQuestionTypeChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].type = value;
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

      const response = await fetch(`${import.meta.env.VITE_PUBLIC_DATA}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        toast.success("Survey data saved successfully!");
        // toast.promise(response, {
        //   loading: "Guardando la encuesta...",
        //   success: "Encuesta guardada exitosamente!",
        //   error: "Error al guardar la encuesta",
        // });
      } else {
        toast.error("Error saving survey data:", response.statusText);
        console.log(error);
      }
    } catch (error) {
      toast.error("An error occurred:", error);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Box p={4}>
        <FormControl>
          <FormLabel
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight={"bold"}
          >
            Nombre de la encuesta:
          </FormLabel>
          <Input
            type="text"
            value={surveyName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </FormControl>

        <FormControl my={4}>
          <FormLabel fontWeight={"bold"}>Descripción:</FormLabel>
          <Textarea
            value={surveyDescription}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </FormControl>

        {questions.map((questionData, questionIndex) => (
          <FormControl mt={4} key={questionIndex}>
            <FormLabel>Pregunta {questionIndex + 1}:</FormLabel>
            <Input
              type="text"
              value={questionData.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
            />
            <FormLabel fontWeight={"bold"}>Tipo de pregunta:</FormLabel>
            <Select
              value={questionData.type}
              onChange={(e) =>
                handleQuestionTypeChange(questionIndex, e.target.value)
              }
            >
              <option value="SINGLE_CHOICE">Single Choice</option>
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="OPEN_ENDED">Open-ended</option>
            </Select>
            {questionData.type !== "OPEN_ENDED" && (
              <div>
                <FormLabel>Options:</FormLabel>
                <Stack spacing={2}>
                  {questionData.options.map((option, optionIndex) => (
                    <Input
                      key={optionIndex}
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          questionIndex,
                          optionIndex,
                          e.target.value
                        )
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
              </div>
            )}
          </FormControl>
        ))}

        <Button mt={4} onClick={handleAddQuestion}>
          Add Question
        </Button>

        <Button mt={4} colorScheme="blue" onClick={handleCreateSurvey}>
          Save Survey
        </Button>
      </Box>
      <Toaster />
    </Flex>
  );
};

export default SurveyCreator;
