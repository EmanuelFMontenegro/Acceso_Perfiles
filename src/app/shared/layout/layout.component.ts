import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ToolbarModule } from 'primeng/toolbar';
import SidebarComponent from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router'; // Importa Router
import DashboardComponent from '../../pages/dashboard/dashboard.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, // Agrega CommonModule aquí
    ToolbarModule,
    SidebarComponent,
    RouterOutlet,
    DashboardComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  menuVisible = false;
  sidebarVisible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {} // Inyecta el Router

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  closeMenu() {
    this.menuVisible = false;
  }
  toggleSidebar() {
    // Lógica para cerrar la barra lateral
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        // Eliminar el estado del menú y redirigir al login
        this.menuVisible = false;
        this.router.navigate(['/auth/login']); // Asegúrate de que la ruta es correcta
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
