import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, Usuario, MeResponse } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tokenPreview = '';
  usuarios: Usuario[] = [];
  loadingUsuarios = false;
  errorUsuarios = '';
  me: MeResponse | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken() || '';
    this.tokenPreview = token;

    this.authService.getMe().subscribe({
      next: (user) => {
        this.me = user;
      },
      error: () => {
        this.me = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  cargarUsuarios(): void {
    this.loadingUsuarios = true;
    this.errorUsuarios = '';

    this.authService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.loadingUsuarios = false;
      },
      error: (err: any) => {
        this.errorUsuarios = err.error?.message || 'Error al cargar usuarios';
        this.loadingUsuarios = false;
      }
    });
  }

  refreshToken(): void {
    this.authService.refreshToken().subscribe({
      next: (res: { accessToken: string }) => {
        this.tokenPreview = res.accessToken;
        alert('Token refrescado correctamente');
      },
      error: (err: any) => {
        this.errorUsuarios = err.error?.message || 'Error al refrescar el token';
      }
    });
  }

  esAdmin(): boolean {
    return this.me?.rol === 'admin';
  }
}