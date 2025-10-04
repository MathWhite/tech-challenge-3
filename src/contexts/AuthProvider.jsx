import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

// Tokens de exemplo fornecidos
const TOKENS = {
  professor: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvZmVzc29yIiwibmFtZSI6Ik1hdGhldXMiLCJpYXQiOjE3NTI2NjgzMzZ9.BQUrflZw8QktIBmqOVWiPvu0jDowJl_-SiBr9yCyPv0",
  aluno: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWx1bm8iLCJuYW1lIjoiTWF0aGV1cyIsImlhdCI6MTc1MjY2ODMzNn0.G6i94pkpNQQ5o-7pLpmNdSMbj1FfWpoBYn2U0oMBusU"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega o usuário do localStorage na inicialização
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const userData = JSON.parse(saved);
        setUser(userData);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Funções auxiliares para verificar role (expostas como funções para compatibilidade com os consumidores)
  const isProfessor = useCallback(() => user?.role === "professor", [user]);
  const isAluno = useCallback(() => user?.role === "aluno", [user]);

  // Função para decodificar JWT (simulação simples)
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  };

  // Função de login
  const login = async (username, password) => {
    console.log("AuthProvider - login chamado com:", username, password);
    // Normaliza entradas para evitar erros de espaço/capitalização
    const normalizedUsername = String(username || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();
    // Simulação de autenticação
    if (normalizedUsername === "professor" && normalizedPassword === "1234") {
      console.log("Professor autenticado com sucesso");
      const token = TOKENS.professor;
      const decoded = decodeToken(token);
      const userData = {
        username: normalizedUsername,
        name: decoded?.name || "Professor",
        role: decoded?.role || "professor",
        token: token
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, user: userData };
    } else if (normalizedUsername === "aluno" && normalizedPassword === "1234") {
      console.log("Aluno autenticado com sucesso");
      const token = TOKENS.aluno;
      const decoded = decodeToken(token);
      const userData = {
        username: normalizedUsername,
        name: decoded?.name || "Aluno",
        role: decoded?.role || "aluno",
        token: token
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, user: userData };
    }
    console.log("Credenciais inválidas recebidas:", username, password);
    return { success: false, message: "Credenciais inválidas" };
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isProfessor,
    isAluno
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};