import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../api/config";

export const AuthContext = createContext({
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () => {
      checkUser();
    });

    const checkUser = async () => {
      const user = supabase.auth.user();
      setUser(user);

      const allowedRoutes = ["/createsurvey", "/survey/:surveyId"]; // Agrega aquí las rutas permitidas sin autenticación

      if (!user) {
        if (!allowedRoutes.includes(window.location.pathname)) {
          navigate("/login", { replace: true });
        }
      } else {
        // Si el usuario está logueado y la ruta es /createsurvey, redireccionar a "/"
        if (allowedRoutes.includes(window.location.pathname)) {
          navigate("/", { replace: true });
        }
      }
    };

    checkUser();

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
