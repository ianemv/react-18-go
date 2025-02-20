import api from "./api";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

class AuthService {
  private static readonly TOKEN_KEY = "token";
  private static readonly USER_KEY = "user";

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      this.setSession(data);
      return data;
    } catch (error: unknown) {
      throw new Error(
        `Login failed: ${
          error instanceof Error
            ? error.message
            : "Please check your credentials."
        }`
      );
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>(
        "/auth/register",
        credentials
      );
      this.setSession(data);
      return data;
    } catch (error: unknown) {
      throw new Error(
        `Registration failed: ${
          error instanceof Error ? error.message : "Please try again."
        }`
      );
    }
  }
  async refreshToken(): Promise<void> {
    try {
      const { data } = await api.post<AuthResponse>("/auth/refresh");
      this.setSession(data);
    } catch {
      this.logout();
      throw new Error("Session expired. Please login again.");
    }
  }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
    window.location.href = "/login";
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(AuthService.TOKEN_KEY, authResponse.token);
    localStorage.setItem(
      AuthService.USER_KEY,
      JSON.stringify(authResponse.user)
    );
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await api.get<User>("/auth/me");
      return data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;
