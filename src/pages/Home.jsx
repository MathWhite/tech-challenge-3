import { useEffect, useState } from "react";
import styled from "styled-components";
import PostCard from "../components/PostCard";
import Navigation from "../components/Navigation";
import { getPosts, searchPosts } from "../api/posts";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const MainContent = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #666;
`;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { isProfessor } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = query ? await searchPosts(query) : await getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Erro ao buscar posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [query]);

  return (
    <MainContent>
      <Navigation />
      <Container>
        <h1>Lista de postagens</h1>
        <SearchBox
          type="text"
          placeholder="Buscar posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <Message>Carregando posts...</Message>}
        {!loading && posts.length === 0 && <Message>Nenhum post encontrado.</Message>}

        {posts.map((post) => (
          <PostCard
            key={post._id || post.id}
            id={post._id || post.id}
            title={post.title}
            author={post.author}
            description={post.description}
            readTime={post.readTime || post.reading_time || 5} // Fallback para garantir que sempre tenha um valor
            isActive={post.isActive !== false} // Assume ativo se não especificado
            isProfessorView={isProfessor()}
          />
        ))}
      </Container>
    </MainContent>
  );
}
