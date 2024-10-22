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
    const currentUser = this.authService.currentUserValue; 
    const expectedRoles = route.data['expectedRole'];

    console.log('Current User:', currentUser);
    if (this.authService.isLoggedIn()) {
      if (expectedRoles && expectedRoles.includes(currentUser?.profile)) {
        return true; // Permitir acceso
      } else {
        console.warn('Acceso denegado, redirigiendo a login');
        this.router.navigate(['auth/login']);
        return false;
      }
    }

    console.warn('Usuario no autenticado, redirigiendo a login');
    this.router.navigate(['auth/login']);
    return false;
  }
}
