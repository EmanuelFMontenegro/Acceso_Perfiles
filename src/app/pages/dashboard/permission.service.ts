import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private authService: AuthService) {}


  hasprofile(expectedprofile: string): boolean {
    const user: User | null = this.authService.currentUserValue;

    if (user) {
      return user.profile === expectedprofile;
    }

    return false;
  }


  hasAnyprofile(profiles: string[]): boolean {
    const user: User | null = this.authService.currentUserValue;
    if (user) {
      return profiles.includes(user.profile); 
    }
    return false;
  }
}
