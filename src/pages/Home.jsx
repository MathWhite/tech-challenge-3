import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import PostCard from "../components/PostCard";
import Navigation from "../components/Navigation";
import { getPosts, searchPosts } from "../api/posts";
import { useAuth } from "../contexts/useAuth";

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

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #e74c3c;
  background: #ffeaea;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #f5c6cb;
`;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isProfessor } = useAuth();

  // Debounce da query para evitar muitas requisições
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = debouncedQuery ? await searchPosts(debouncedQuery) : await getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Erro ao buscar posts", err);
      
      // Se for erro 401 na pesquisa, tenta fazer a busca geral
      if (err.response?.status === 401 && debouncedQuery) {
        console.log("Erro 401 na pesquisa, tentando busca geral...");
        try {
          const fallbackData = await getPosts();
          setPosts(fallbackData);
          setError("Pesquisa indisponível. Mostrando todos os posts.");
        } catch (fallbackErr) {
          console.error("Erro na busca geral também:", fallbackErr);
          setPosts([]);
          setError("Erro ao carregar posts. Tente novamente.");
        }
      } else {
        setPosts([]);
        setError("Erro ao carregar posts. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && <Message>Carregando posts...</Message>}
        {!loading && posts.length === 0 && !error && <Message>Nenhum post encontrado.</Message>}

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
