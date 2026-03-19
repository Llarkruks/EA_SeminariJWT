import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario, Organizacion } from '../../services/auth.service';

@Component({
  selector: 'app-admin-resource',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-resource.component.html',
  styleUrls: ['./admin-resource.component.css']
})
export class AdminResourceComponent implements OnInit {
  usuarios: Usuario[] = [];
  loadingUsuarios = false;
  errorUsuarios = '';

  nuevaOrganizacion = '';
  creandoOrganizacion = false;
  errorOrganizacion = '';
  successOrganizacion = '';

  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.isAdmin = user.rol === 'admin';
      },
      error: () => {
        this.isAdmin = false;
      }
    });
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

  crearOrganizacion(): void {
    if (!this.nuevaOrganizacion.trim()) {
      this.errorOrganizacion = 'El nombre es obligatorio';
      this.successOrganizacion = '';
      return;
    }

    this.creandoOrganizacion = true;
    this.errorOrganizacion = '';
    this.successOrganizacion = '';

    this.authService.createOrganizacion({ name: this.nuevaOrganizacion }).subscribe({
      next: (org: Organizacion) => {
        this.successOrganizacion = `Organización creada correctamente: ${org.name}`;
        this.nuevaOrganizacion = '';
        this.creandoOrganizacion = false;
      },
      error: (err: any) => {
        this.errorOrganizacion = err.error?.message || 'No tienes permisos o hubo un error';
        this.creandoOrganizacion = false;
      }
    });
  }
}