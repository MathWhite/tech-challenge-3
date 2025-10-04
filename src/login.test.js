import { describe, it, expect } from 'vitest';

// Simular a função de login
const login = async (username, password) => {
  // Simulação de autenticação
  if (username === "professor" && password === "1234") {
    return { success: true, user: { name: "Matheus", role: "professor" } };
  } else if (username === "aluno" && password === "1234") {
    return { success: true, user: { name: "Matheus", role: "aluno" } };
  }
  return { success: false, message: "Credenciais inválidas" };
};

describe('Login Test', () => {
  it('should login professor with correct credentials', async () => {
    const result = await login("professor", "1234");
    expect(result.success).toBe(true);
    expect(result.user.role).toBe("professor");
  });

  it('should login aluno with correct credentials', async () => {
    const result = await login("aluno", "1234");
    expect(result.success).toBe(true);
    expect(result.user.role).toBe("aluno");
  });

  it('should fail with wrong credentials', async () => {
    const result = await login("professor", "wrong");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Credenciais inválidas");
  });

  it('should fail with wrong username', async () => {
    const result = await login("wrong", "1234");
    expect(result.success).toBe(false);
  });
});