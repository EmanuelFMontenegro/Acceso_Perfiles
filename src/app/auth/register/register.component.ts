import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ApiFirebaseService } from '../../services/apiFirebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export default class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordIconPath: string =
    'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'; // Icono por defecto
  confirmPasswordIconPath: string =
    'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'; // Icono por defecto

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private apifirebaseService: ApiFirebaseService,
    private auth: Auth
  ) {}

  async register(): Promise<User | null> {
    // Usa las propiedades de clase directamente
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
        profile: 'profile', // Puedes establecer un rol predeterminado
      });

      const newUser = this.mapFirebaseUserToCustomUser(user, 'user'); // Asigna el rol 'user' aquí
      this.authService.setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw this.getErrorMessage(error);
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordIconPath = this.passwordVisible
      ? 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'
      : 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'; // Cambia el icono según la visibilidad
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    this.confirmPasswordIconPath = this.confirmPasswordVisible
      ? 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'
      : 'M12 3C6.48 3 2 7.13 2 12s4.48 9 10 9 10-4.13 10-9-4.48-9-10-9z'; // Cambia el icono según la visibilidad
  }
  // Método para mapear el usuario de Firebase a un objeto User
  private mapFirebaseUserToCustomUser(
    firebaseUser: any,
    profile: string
  ): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: this.name, // Suponiendo que `name` es una propiedad que quieres incluir
      profile: profile,
    } as User;
  }

  // Método para manejar errores de autenticación
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
