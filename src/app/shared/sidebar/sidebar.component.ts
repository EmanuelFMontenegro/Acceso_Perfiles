import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; // Importa RouterModule
import { PermissionService } from '../../pages/dashboard/permission.service';
import { AuthService } from '../../auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet], // Incluye los módulos que utilizas
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Corrige a 'styleUrls'
})
export default class SidebarComponent {
  isMenuOpen = false;
  @Input() isVisible: boolean = true;

  constructor(
    private authService: AuthService, // Mueve el constructor aquí
    private permissionService: PermissionService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  selectOption(option: string) {
    console.log('Opción seleccionada:', option);
    this.isMenuOpen = false; // Cierra el menú después de seleccionar una opción
  }
  isAdmin(): boolean {
    return this.permissionService.hasprofile('admin');
  }
}
