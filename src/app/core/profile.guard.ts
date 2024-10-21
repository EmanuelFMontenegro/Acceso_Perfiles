import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = next.data['expectedRole'];
    const currentUser = this.authService.currentUserValue; // Aquí usas el getter

    console.log('Usuario actual en el guard (RoleGuard):', currentUser);

    if (currentUser && currentUser.profile === expectedRole) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
