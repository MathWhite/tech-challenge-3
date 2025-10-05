import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPost, createComment, updateComment, deleteComment } from "../api/posts";
import { useAuth } from "../contexts/useAuth";
import Navigation from "../components/Navigation";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiPencil, mdiDelete } from '@mdi/js';

const Container = styled.div`
  max-width: 1800px;
  margin: 2rem auto;
  padding: 0 1rem 2rem 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem 2rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem 2rem 0.5rem;
  }
`;

const MainContent = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

const BackButton = styled.button`
  display: inline-block;
  margin-bottom: 1rem;
  color: #667eea;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  
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
  margin-bottom: 3rem;
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
  position: relative;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: #333;
`;

const CommentDate = styled.div`
  font-size: 0.75rem;
  color: #888;
`;

const CommentText = styled.div`
  color: #666;
`;

const CommentMenuButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #666;
  }
`;

const CommentMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 120px;
`;

const CommentMenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  
  &.delete {
    color: #e74c3c;
    
    &:hover {
      background: #ffeaea;
    }
  }
`;

const EditCommentInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const EditCommentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const EditActionButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &.save {
    background: #28a745;
    color: white;
  }
  
  &.cancel {
    background: #6c757d;
    color: white;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

export default function PostRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [openMenuComment, setOpenMenuComment] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPost(id);
        setPost(data);
        setComments(data.comments || []); // Carregar comentários da API
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!user) {
      toast.error("Você precisa estar logado para comentar");
      return;
    }

    try {
      const commentData = {
        comment: newComment.trim()
      };
      
      const updatedPost = await createComment(id, commentData);
      setComments(updatedPost.comments || []);
      setNewComment("");
      toast.success("Comentário adicionado com sucesso!");
    } catch (error) {
      console.error("Error creating comment:", error);
      const errorMessage = error.response?.data?.message || "Erro ao adicionar comentário";
      toast.error(errorMessage);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setEditText(comment.comment);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const commentData = {
        comment: editText.trim()
      };
      
      const updatedPost = await updateComment(id, commentId, commentData);
      setComments(updatedPost.comments || []);
      setEditingComment(null);
      setEditText("");
      setOpenMenuComment(null);
      toast.success("Comentário atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating comment:", error);
      const errorMessage = error.response?.data?.message || "Erro ao atualizar comentário";
      toast.error(errorMessage);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Tem certeza que deseja deletar este comentário?")) return;

    try {
      await deleteComment(id, commentId);
      // Recarregar o post para obter a lista atualizada de comentários
      const updatedPost = await getPost(id);
      setComments(updatedPost.comments || []);
      setOpenMenuComment(null);
      toast.success("Comentário deletado com sucesso!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      const errorMessage = error.response?.data?.message || "Erro ao deletar comentário";
      toast.error(errorMessage);
    }
  };

  const cancelEdit = () => {
    setEditingComment(null);
    setEditText("");
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para controlar o menu de ações
  const toggleCommentMenu = (commentId) => {
    setOpenMenuComment(openMenuComment === commentId ? null : commentId);
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuComment(null);
    };
    
    if (openMenuComment) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuComment]);

  // Função para verificar se o usuário pode editar/deletar um comentário
  const normalize = (v) => String(v || "").trim().toLowerCase();
  const isOwnComment = (comment) => {
    const author = normalize(comment?.author);
    const candidates = [user?.username, user?.name]
      .map(normalize)
      .filter(Boolean);
    return candidates.includes(author);
  };

  const canEditComment = (comment) => {
    if (!user) return false;
    return isOwnComment(comment);
  };

  const canDeleteComment = (comment) => {
    if (!user) return false;
    // Professor pode deletar comentários de alunos, mas não de outros professores
    if (user.role === "professor") {
      const authorRole = normalize(comment?.authorRole || comment?.role);
      return isOwnComment(comment) || authorRole === "aluno";
    }
    // Aluno só pode deletar seus próprios comentários
    return isOwnComment(comment);
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
          <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
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
          <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
        </Container>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Navigation />
      <Container>
      <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
      
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

        {comments.map((comment, index) => (
          <Comment key={comment._id || index}>
            <CommentHeader>
              <CommentInfo>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
              </CommentInfo>
              {user && (
                <div style={{ position: 'relative' }}>
                  <CommentMenuButton
                    aria-label="Abrir menu do comentário"
                    title="Mais ações"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCommentMenu(comment._id);
                    }}
                  >
                    <Icon
                      path={mdiDotsHorizontal}
                      size={0.8}
                      style={{ display: 'block' }}
                    />
                  </CommentMenuButton>

                  {openMenuComment === comment._id && (canEditComment(comment) || canDeleteComment(comment)) && (
                    <CommentMenu onClick={(e) => e.stopPropagation()}>
                      {canEditComment(comment) && (
                        <CommentMenuItem
                          onClick={() => {
                            handleEditComment(comment);
                            setOpenMenuComment(null);
                          }}
                        >
                          <Icon
                            path={mdiPencil}
                            size={0.7}
                            style={{ display: 'inline-block', marginRight: '0.5rem' }}
                          />
                          Editar
                        </CommentMenuItem>
                      )}
                      {canDeleteComment(comment) && (
                        <CommentMenuItem
                          className="delete"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          <Icon
                            path={mdiDelete}
                            size={0.7}
                            style={{ display: 'inline-block', marginRight: '0.5rem' }}
                          />
                          Deletar
                        </CommentMenuItem>
                      )}
                    </CommentMenu>
                  )}
                </div>
              )}
            </CommentHeader>
            
            {editingComment === comment._id ? (
              <>
                <EditCommentInput
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <EditCommentActions>
                  <EditActionButton 
                    className="save" 
                    onClick={() => handleUpdateComment(comment._id)}
                  >
                    Salvar
                  </EditActionButton>
                  <EditActionButton className="cancel" onClick={cancelEdit}>
                    Cancelar
                  </EditActionButton>
                </EditCommentActions>
              </>
            ) : (
              <CommentText>{comment.comment}</CommentText>
            )}
          </Comment>
        ))}
      </CommentsSection>
    </Container>
    </MainContent>
  );
}
