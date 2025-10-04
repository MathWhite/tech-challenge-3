import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/useAuth";
import toast from "react-hot-toast";

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #f0f0f0;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const UserInfo = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

export default function Navigation() {
  const { user, logout, isProfessor } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <Header>
      <Container>
        <Logo to="/">
          📝 Blog FIAP
        </Logo>
        
        <Nav>
          <NavLink to="/">
            Início
          </NavLink>
          
          {user ? (
            <>
              {isProfessor() && (
                <>
                  <NavLink to="/admin">
                    Admin
                  </NavLink>
                </>
              )}
              <UserInfo>
                Olá, {user?.username || user?.name || "usuário"}
              </UserInfo>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <NavLink to="/login">
              Login
            </NavLink>
          )}
        </Nav>
      </Container>
    </Header>
  );
}
