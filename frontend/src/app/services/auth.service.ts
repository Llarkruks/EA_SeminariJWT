import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  organizacion: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type UserRole = 'admin' | 'user';

export interface LoginResponse {
  message: string;
  accessToken: string;
  usuario: {
    _id: string;
    name: string;
    email: string;
    organizacion: string;
    rol: UserRole;
  };
}

export interface Usuario {
  _id: string;
  name: string;
  email: string;
  organizacion: any;
  rol: UserRole;
}

export interface Organizacion {
  _id: string;
  name: string;
}

export interface MeResponse {
  _id: string;
  name: string;
  email: string;
  organizacion: any;
  rol: UserRole;
}

const TOKEN_KEY = 'jwt_token';
const API_URL = 'http://localhost:1337';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: MeResponse | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${API_URL}/usuarios`, payload).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${API_URL}/auth/refresh`, {}, { withCredentials: true }).pipe(
      tap((res) => {
        this.saveToken(res.accessToken);
      })
    );
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, payload, { withCredentials: true }).pipe(
      tap((res) => {
        this.saveToken(res.accessToken);
        this.currentUser = {
          _id: res.usuario._id,
          name: res.usuario.name,
          email: res.usuario.email,
          organizacion: res.usuario.organizacion,
          rol: res.usuario.rol
        };
        this.router.navigate(['/home']);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}/usuarios`);
  }

  createOrganizacion(payload: { name: string }): Observable<Organizacion> {
    return this.http.post<Organizacion>(`${API_URL}/organizaciones`, payload);
  }

  getMe(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${API_URL}/auth/me`).pipe(
      tap((user) => {
        this.currentUser = user;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): MeResponse | null {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.rol === 'admin';
  }

  logout(): void {
    this.http.post(`${API_URL}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {},
      error: () => {}
    });

    this.currentUser = null;
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}