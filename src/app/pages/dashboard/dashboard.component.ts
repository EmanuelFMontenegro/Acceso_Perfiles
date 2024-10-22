import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { PermissionService } from './permission.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { EliminarUsuariosComponent } from './eliminar-usuarios/eliminar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ListarPublicacionesComponent } from './listar-publicaciones/listar-publicaciones.component';

import { RouterOutlet } from '@angular/router';
import SidebarComponent from '../../shared/sidebar/sidebar.component';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    ToolbarModule,
    ButtonModule,
    VerUsuariosComponent,
    EliminarUsuariosComponent,
    EditarUsuariosComponent,
    ListarPublicacionesComponent,
    RouterOutlet,
    SidebarComponent,
  ],
})
export default class DashboardComponent implements OnInit {
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
      this.posts = posts;
      this.loading = false;
    });
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.router.navigate(['auth/login']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  isAdmin(): boolean {
    return this.permissionService.hasprofile('admin');
  }

  canEdit(): boolean {
    return this.isAdmin();
  }

  canViewPosts(): boolean {
    return this.currentUser !== null;
  }

  createUser(): void {
    if (this.isAdmin()) {
      // Lógica para crear un usuario
    } else {
      console.warn(
        'Acceso denegado. Solo los administradores pueden crear usuarios.'
      );
    }
  }

  editUser(): void {
    if (this.isAdmin()) {
      // Lógica para editar un usuario
    } else {
      console.warn(
        'Acceso denegado. Solo los administradores pueden editar usuarios.'
      );
    }
  }

  deleteUser(): void {
    if (this.isAdmin()) {
      // Lógica para eliminar un usuario
    } else {
      console.warn(
        'Acceso denegado. Solo los administradores pueden eliminar usuarios.'
      );
    }
  }
}
