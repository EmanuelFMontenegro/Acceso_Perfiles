import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authService.currentUserValue; // Usuario autenticado
    const expectedRoles = route.data['expectedRole']; // Roles permitidos

    // Verifica si hay un token de autenticación
    if (this.authService.isLoggedIn()) {
      // Método para verificar si hay un token
      // Verifica si el perfil del usuario está en la lista de roles permitidos
      if (expectedRoles && expectedRoles.includes(currentUser?.profile)) {
        return true; // Permitir acceso
      } else {
        // Si el perfil no está permitido, redirigir o mostrar un mensaje de error
        this.router.navigate(['auth/login']);
        return false;
      }
    }

    // Si no hay un usuario autenticado, redirige al login
    this.router.navigate(['auth/login']);
    return false;
  }
}
