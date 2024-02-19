import { useState, useEffect, createContext } from "react";
import { axiosClient } from "../services/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Función autoejecutable para loguear al usuario
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token2024");

      if (!token) {
        setIsLoading(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient("/users/get-me", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem("token2024");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
