import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPost } from "../api/posts";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import toast from "react-hot-toast";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const MainContent = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
`;

const BackButton = styled.button`
  background: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    background: #5a6268;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 300px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const PrimaryButton = styled(Button)`
  background: #28a745;
  color: white;
  
  &:hover:not(:disabled) {
    background: #218838;
  }
`;

const SecondaryButton = styled(Button)`
  background: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background: #5a6268;
  }
`;

const MarkdownHelp = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const HelpTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const HelpText = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [readTime, setReadTime] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !author.trim() || !description.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    
    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        description: description.trim(),
        isActive,
        readTime: readTime.trim() || null,
        createdAt: new Date().toISOString()
      };
      
      await createPost(postData);
      toast.success("Post criado com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Erro ao criar post. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  // Pré-preencher o autor com o usuário logado
  useState(() => {
    if (user && user.username && !author) {
      setAuthor(user.username);
    }
  }, [user]);

  return (
    <MainContent>
      <Navigation />
      <Container>
      <Header>
        <Title>Criar Novo Post</Title>
        <BackButton onClick={handleCancel}>
          ← Voltar
        </BackButton>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do post"
            disabled={loading}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descrição *</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descrição do post (aparece na listagem)"
            disabled={loading}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Autor *</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nome do autor"
            disabled={loading}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="readTime">Tempo de Leitura (minutos)</Label>
          <Input
            id="readTime"
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="Ex: 5 min, 3 minutos, etc."
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <CheckboxWrapper>
            <Checkbox
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={loading}
            />
            <Label htmlFor="isActive">Post ativo (visível no site)</Label>
          </CheckboxWrapper>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Conteúdo *</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo do post em Markdown..."
            disabled={loading}
            required
          />
        </FormGroup>

        <MarkdownHelp>
          <HelpTitle>💡 Dica: Você pode usar Markdown</HelpTitle>
          <HelpText>
            Use **negrito**, *itálico*, `código`, ## Títulos, e muito mais!
          </HelpText>
        </MarkdownHelp>

        <ButtonGroup>
          <SecondaryButton 
            type="button" 
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton 
            type="submit"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Criar Post"}
          </PrimaryButton>
        </ButtonGroup>
      </Form>
    </Container>
    </MainContent>
  );
}
