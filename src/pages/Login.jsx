import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: #667eea;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #5a6fd8;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
`;

const InfoText = styled.p`
  text-align: center;
  color: #666;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login, isProfessor, isAluno } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const success = login(username, password);
      if (success) {
        toast.success("Login realizado com sucesso!");
        
        // Redirecionamento baseado no role do usuário
        if (isProfessor()) {
          navigate("/admin");
        } else if (isAluno()) {
          navigate("/");
        } else {
          navigate("/"); // Default para home
        }
      } else {
        setError("Credenciais inválidas");
      }
    } catch {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Login - Blog FIAP</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InfoText>
          <strong>Credenciais de teste:</strong><br />
          <strong>Professor:</strong> professor / 1234<br />
          <strong>Aluno:</strong> aluno / 1234
        </InfoText>
      </LoginCard>
    </Container>
  );
}
