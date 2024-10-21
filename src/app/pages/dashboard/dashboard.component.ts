import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user.model';
import { PermissionService } from './permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  comments: Comment[] = [];
  loading: boolean = true;
  isOpen = false; // Estado inicial del sidebar
  currentUser: User | null = null;
  menuVisible: boolean = false;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private permissionService: PermissionService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadPosts(); // Carga los posts al iniciar
  }

  // Método para cargar posts
  private loadPosts(): void {
    this.apiService.fetchPosts().subscribe((posts: Post[]) => {
      // Especificar el tipo Post[]
      this.posts = posts;
      this.loading = false;
    });
  }
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
  logout() {
    // Aquí puedes añadir la lógica para limpiar el token o información del usuario
    this.router.navigate(['auth/login']);
  }
  navigateTo(path: string): void {
    this.router.navigate([path]); // Usa el router aquí
  }

  // Método para alternar el estado del sidebar
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  // Verifica si el usuario es admin
  isAdmin(): boolean {
    return this.permissionService.hasprofile('admin');
  }

  // Verifica si el usuario puede editar
  canEdit(): boolean {
    return this.isAdmin(); // Solo los admins pueden editar
  }

  // Método para determinar si el usuario tiene acceso a funcionalidades específicas
  canViewPosts(): boolean {
    return this.currentUser !== null; // Cualquier usuario autenticado puede ver los posts
  }

  createUser(): void {
    if (this.isAdmin()) {
      // Implementa la lógica para crear un usuario
    } else {
      // Mensaje o lógica si el usuario no tiene permisos
      console.warn(
        'Acceso denegado. Solo los administradores pueden crear usuarios.'
      );
    }
  }

  editUser(): void {
    if (this.isAdmin()) {
      // Implementa la lógica para editar un usuario
    } else {
      // Mensaje o lógica si el usuario no tiene permisos
      console.warn(
        'Acceso denegado. Solo los administradores pueden editar usuarios.'
      );
    }
  }

  deleteUser(): void {
    if (this.isAdmin()) {
      // Implementa la lógica para eliminar un usuario
    } else {
      // Mensaje o lógica si el usuario no tiene permisos
      console.warn(
        'Acceso denegado. Solo los administradores pueden eliminar usuarios.'
      );
    }
  }
}
