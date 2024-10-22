import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ApiFirebaseService } from '../../services/apiFirebase.service';
import { ToastrService } from 'ngx-toastr'; // Importar ToastrService
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export default class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordIconPath: string =
    'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z';
  confirmPasswordIconPath: string =
    'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z';

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private apifirebaseService: ApiFirebaseService,
    private toastr: ToastrService
  ) {}

  async register(): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const user = userCredential.user;

      await setDoc(doc(this.firestore, `users/${user.uid}`), {
        email: user.email,
        name: this.name,
        profile: 'profile',
      });

      const newUser = this.mapFirebaseUserToCustomUser(user, 'user');

      this.router.navigate(['/auth/login']);
      return newUser;
    } catch (error) {
      console.error('Error durante el registro:', error);
      this.toastr.error(this.getErrorMessage(error), 'Error al registrar');
      return null; 
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordIconPath = this.passwordVisible
      ? 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'
      : 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    this.confirmPasswordIconPath = this.confirmPasswordVisible
      ? 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'
      : 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z';
  }

  private mapFirebaseUserToCustomUser(
    firebaseUser: any,
    profile: string
  ): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: this.name,
      profile: profile,
    } as User;
  }

  private getErrorMessage(error: any): string {
    console.error('Error de registro:', error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Error durante el registro. Inténtalo de nuevo.';
    }
  }
}
