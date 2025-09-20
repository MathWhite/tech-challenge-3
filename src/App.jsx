import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import GlobalStyle from "./styles/GlobalStyle";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostRead from "./pages/PostRead";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";
import Admin from "./pages/Admin";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

// Proteção de rotas
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#666'
      }}>
        Carregando...
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Proteção específica para professores
const RequireProfessor = ({ children }) => {
  const { user, loading, isProfessor } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#666'
      }}>
        Carregando...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isProfessor()) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#666',
        textAlign: 'center'
      }}>
        <h2>Acesso Negado</h2>
        <p>Esta área é restrita apenas para professores.</p>
        <button onClick={() => window.history.back()} style={{marginTop: '1rem', padding: '0.5rem 1rem'}}>
          Voltar
        </button>
      </div>
    );
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Toaster position="top-right" />
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostRead />} />
            <Route
              path="/create"
              element={
                <RequireProfessor>
                  <PostCreate />
                </RequireProfessor>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <RequireProfessor>
                  <PostEdit />
                </RequireProfessor>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireProfessor>
                  <Admin />
                </RequireProfessor>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AppContainer>
    </AuthProvider>
  );
}

export default App;
