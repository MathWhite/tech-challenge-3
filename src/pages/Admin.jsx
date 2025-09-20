import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPosts, deletePost } from "../api/posts";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import toast from "react-hot-toast";

const Container = styled.div`
  max-width: 1200px;
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
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  display: inline-block;
  
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

const CreateButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: #28a745;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #218838;
  }
`;

const UserInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PostsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  font-weight: bold;
  color: #333;
`;

const PostRow = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f8f9fa;
  }
`;

const PostInfo = styled.div`
  min-width: 0;
`;

const PostTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
  word-break: break-word;
`;

const PostMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
`;

const EditButton = styled(ActionButton)`
  background: #ffc107;
  color: #212529;
  
  &:hover:not(:disabled) {
    background: #e0a800;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545;
  color: white;
  
  &:hover:not(:disabled) {
    background: #c82333;
  }
`;

const ViewButton = styled(ActionButton)`
  background: #007bff;
  color: white;
  
  &:hover:not(:disabled) {
    background: #0056b3;
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

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  margin: 1rem;
`;

const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const ModalText = styled.p`
  margin: 0 0 2rem 0;
  color: #666;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const { user, logout } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    setDeleting(true);
    
    try {
      await deletePost(postToDelete._id || postToDelete.id);
      toast.success("Post excluído com sucesso!");
      setPosts(posts.filter(p => (p._id || p.id) !== (postToDelete._id || postToDelete.id)));
      setDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Erro ao excluir post. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
  };

  if (loading) {
    return (
      <MainContent>
        <Navigation />
        <Container>
          <LoadingMessage>Carregando posts...</LoadingMessage>
        </Container>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Navigation />
      <Container>
      <Header>
        <Title>Painel Administrativo</Title>
        <HeaderActions>
          <UserInfo>
            Logado como: <strong>{user?.username}</strong>
          </UserInfo>
          <CreateButton to="/create">
            + Novo Post
          </CreateButton>
          <SecondaryButton onClick={handleLogout}>
            Logout
          </SecondaryButton>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!error && (
        <PostsTable>
          <TableHeader>
            <div>Post</div>
            <div>Visualizar</div>
            <div>Editar</div>
            <div>Excluir</div>
          </TableHeader>

          {posts.length === 0 ? (
            <EmptyMessage>
              Nenhum post encontrado. <Link to="/create">Criar o primeiro post</Link>
            </EmptyMessage>
          ) : (
            posts.map((post) => (
              <PostRow key={post._id || post.id}>
                <PostInfo>
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>
                    Por {post.author} • {new Date(post.createdAt || Date.now()).toLocaleDateString('pt-BR')}
                  </PostMeta>
                </PostInfo>
                
                <Link to={`/post/${post._id || post.id}`}>
                  <ViewButton>Ver</ViewButton>
                </Link>
                
                <Link to={`/edit/${post._id || post.id}`}>
                  <EditButton>Editar</EditButton>
                </Link>
                
                <DeleteButton onClick={() => handleDeleteClick(post)}>
                  Excluir
                </DeleteButton>
              </PostRow>
            ))
          )}
        </PostsTable>
      )}

      {deleteModalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>Confirmar Exclusão</ModalTitle>
            <ModalText>
              Tem certeza que deseja excluir o post "{postToDelete?.title}"? 
              Esta ação não pode ser desfeita.
            </ModalText>
            <ModalActions>
              <SecondaryButton 
                onClick={handleDeleteCancel}
                disabled={deleting}
              >
                Cancelar
              </SecondaryButton>
              <DeleteButton 
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? "Excluindo..." : "Excluir"}
              </DeleteButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </Container>
    </MainContent>
  );
}
