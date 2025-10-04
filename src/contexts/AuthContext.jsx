import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

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
        // Verifica se os dados são válidos
        if (userData && userData.username && userData.role && userData.token) {
          setUser(userData);
        } else {
          // Remove dados inválidos
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (username, password) => {
    // Sistema de login usando tokens reais
    let newUser = null;
    
    if (username === "professor" && password === "1234") {
      newUser = { 
        username: "Matheus", 
        role: "professor",
        token: TOKENS.professor,
        loginTime: new Date().toISOString()
      };
    } else if (username === "aluno" && password === "1234") {
      newUser = { 
        username: "Matheus", 
        role: "aluno",
        token: TOKENS.aluno,
        loginTime: new Date().toISOString()
      };
    }
    
    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const isProfessor = () => {
    return user && user.role === "professor";
  };

  const isAluno = () => {
    return user && user.role === "aluno";
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isProfessor,
    isAluno,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
