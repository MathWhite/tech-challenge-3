import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getPost } from "../api/posts";
import Navigation from "../components/Navigation";
import ReactMarkdown from "react-markdown";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const MainContent = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: #667eea;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Article = styled.article`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Meta = styled.div`
  color: #666;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  line-height: 1.6;
  color: #333;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  code {
    background: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }
  
  pre {
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #666;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #e74c3c;
  background: #ffeaea;
  padding: 1rem;
  border-radius: 8px;
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const CommentsTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentInput = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CommentButton = styled.button`
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background: #5a6fd8;
  }
`;

const Comment = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CommentText = styled.div`
  color: #666;
`;

export default function PostRead() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "João Silva",
      text: "Excelente post! Muito esclarecedor."
    },
    {
      id: 2,
      author: "Maria Santos",
      text: "Obrigada por compartilhar esse conhecimento."
    }
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPost(id);
        setPost(data);
      } catch (err) {
        setError("Erro ao carregar o post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Usuário Anônimo",
        text: newComment.trim()
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  if (loading) {
    return (
      <MainContent>
        <Navigation />
        <Container>
          <LoadingMessage>Carregando post...</LoadingMessage>
        </Container>
      </MainContent>
    );
  }

  if (error) {
    return (
      <MainContent>
        <Navigation />
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton to="/">← Voltar para a página inicial</BackButton>
        </Container>
      </MainContent>
    );
  }

  if (!post) {
    return (
      <MainContent>
        <Navigation />
        <Container>
          <ErrorMessage>Post não encontrado</ErrorMessage>
          <BackButton to="/">← Voltar para a página inicial</BackButton>
        </Container>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Navigation />
      <Container>
      <BackButton to="/">← Voltar para a página inicial</BackButton>
      
      <Article>
        <Title>{post.title}</Title>
        <Meta>
          Por <strong>{post.author}</strong> em {new Date(post.createdAt || Date.now()).toLocaleDateString('pt-BR')}
        </Meta>
        <Content>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Content>
      </Article>

      <CommentsSection>
        <CommentsTitle>Comentários ({comments.length})</CommentsTitle>
        
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Deixe seu comentário..."
            required
          />
          <CommentButton type="submit">
            Comentar
          </CommentButton>
        </CommentForm>

        {comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentText>{comment.text}</CommentText>
          </Comment>
        ))}
      </CommentsSection>
    </Container>
    </MainContent>
  );
}
