import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-content',
  standalone: true,
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css'],
})
export class SidebarContentComponent {
  isOpen = false; // Estado inicial del sidebar
  menuVisible = false; // Estado inicial del menú desplegable

  // Método para alternar el estado del sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  // Método para alternar el menú desplegable
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Método de logout (ejemplo, si lo necesitas)
  logout() {
    // Implementar la lógica de logout aquí
  }
}
