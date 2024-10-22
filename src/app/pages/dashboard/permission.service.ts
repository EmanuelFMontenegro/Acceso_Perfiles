import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private authService: AuthService) {}

  // Método para verificar si el usuario tiene un rol específico
  hasprofile(expectedprofile: string): boolean {
    const user: User | null = this.authService.currentUserValue; // Obtiene el usuario actual

    if (user) {
      return user.profile === expectedprofile; // Retorna true si el rol coincide
    }

    return false; // Retorna false si no hay usuario o no coincide
  }

  // Método para verificar si el usuario tiene varios profiles
  // Método para verificar si el usuario tiene múltiples roles
  hasAnyprofile(profiles: string[]): boolean {
    const user: User | null = this.authService.currentUserValue;
    if (user) {
      return profiles.includes(user.profile); // Retorna true si alguno de los roles coincide
    }
    return false;
  }
}
