import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: transform 0.2s;
  opacity: ${({ $isInactive }) => ($isInactive ? 0.6 : 1)};
  background-color: ${({ $isInactive }) => ($isInactive ? '#f5f5f5' : 'white')};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ReadTime = styled.p`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #333;
`;

export default function PostCard({ id, title, author, description, readTime, isActive = true, isProfessorView = false }) {
  const isInactive = isProfessorView && !isActive;
  
  return (
    <Card $isInactive={isInactive}>
      <Link to={`/post/${id}`}>
        <Title>{title}</Title>
      </Link>
      <Author>por {author}</Author>
      {readTime && <ReadTime>⏱️ {readTime} min de leitura</ReadTime>}
      {isInactive && <ReadTime style={{color: '#999', fontStyle: 'italic'}}>(Post inativo)</ReadTime>}
      {description && <Description>{description}</Description>}
    </Card>
  );
}
