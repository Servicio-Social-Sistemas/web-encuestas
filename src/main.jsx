import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";
const rootElement = document.getElementById("root");
const app = (
  <ChakraProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);

createRoot(rootElement).render(app);
