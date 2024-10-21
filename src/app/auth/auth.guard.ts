import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { PermissionService } from '../pages/dashboard/permission.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private permissionService: PermissionService, // Inyecta el PermissionService
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authService.currentUserValue;
    const expectedRoles = route.data['expectedRole']; // Cambio a notación de corchetes

    if (currentUser) {
      // Verifica si el perfil del usuario está en la lista de roles permitidos
      if (expectedRoles.includes(currentUser.profile)) {
        return true;
      } else {
        // Si el perfil no está permitido, redirigir o mostrar un mensaje de error
        this.router.navigate(['/not-authorized']);
        return false;
      }
    }

    // Si no hay un usuario autenticado, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}
