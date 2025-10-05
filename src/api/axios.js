import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://tech-challenge-edn9.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Apenas redireciona para login se for um erro crítico de autenticação
      // Evita redirecionamento em casos de pesquisa ou outras operações não críticas
      const currentPath = window.location.pathname;
      
      // Se já estiver na página de login, não redireciona novamente
      if (currentPath !== '/login') {
        // Verifica se é uma requisição de pesquisa - não redireciona automaticamente
        const isSearchRequest = error.config?.url?.includes('/search');
        
        if (!isSearchRequest) {
          // Token inválido ou expirado para operações críticas
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
