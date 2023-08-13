import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { RiLinkM } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PUBLIC_DATA}/all`);
        if (response.ok) {
          const data = await response.json();
          setSurveys(data);
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
    <Flex mt={16} flexDir={"column"} justify={"center"}>
      <Text
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        as={"h2"}
        color={"blue.800"}
        fontWeight={"bold"}
        px={{ base: 2, md: 5 }}
      >
        Lista de Encuestas
      </Text>
      <Flex
        wrap={"wrap"}
        p={2}
        gap={4}
        my={4}
        align={"center"}
        justify={"space-around"}
        flexDir={{ base: "column", md: "row" }}
      >
        {surveys.map((survey) => (
          <Box
            maxW={{ base: "sm", xl: "xl" }}
            w={"full"}
            p={4}
            bg={"blue.100"}
            rounded={"lg"}
            key={survey.id}
          >
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              mb={3}
              border={2}
              borderBottomColor={"blue.800"}
              fontWeight={"bold"}
              bg={"gray.100"}
              py={6}
              px={2}
              textAlign={"center"}
              color={"blue.800"}
            >
              {survey.name}
            </Text>
            <Text my={4} color={"blue.700"}>
              Descripción: {survey.description}
            </Text>
            <Button gap={2}>
              <Link to={`/survey/${survey.id}`}>Link Encuesta</Link>
              <RiLinkM />
            </Button>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default SurveyList;
