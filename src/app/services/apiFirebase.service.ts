import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiFirebaseService {
  private currentUser: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    // Suscripción al estado de autenticación
    this.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.fetchUserProfile(firebaseUser.uid).then((userProfile) => {
          const user = this.mapFirebaseUserToCustomUser(
            firebaseUser,
            userProfile
          );
          this.currentUser = user;
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        });
      } else {
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
      }
    });
  }

  // Método para registrar un nuevo usuario
  async register(
    email: string,
    password: string,
    name: string,
    profile: string // Cambia 'role' a 'profile'
  ): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(this.firestore, `users/${user.uid}`), {
        email: user.email,
        name: name,
        profile: profile, // Cambia 'role' a 'profile'
      });

      const newUser = this.mapFirebaseUserToCustomUser(user, profile); // Asegúrate de usar 'profile' aquí
      this.currentUser = newUser;
      sessionStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw this.getErrorMessage(error);
    }
  }

  // Método para iniciar sesión
  async login(username: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        username,
        password
      );
      const profile = await this.fetchUserProfile(userCredential.user.uid); // Cambia 'role' a 'profile'
      const user = this.mapFirebaseUserToCustomUser(
        userCredential.user,
        profile
      );
      this.currentUser = user;
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      throw this.getErrorMessage(error);
    }
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
  }

  // Método para obtener el perfil del usuario
  private async fetchUserProfile(userId: string): Promise<string | null> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    const userSnapshot = await getDoc(userDoc);
    return userSnapshot.exists() ? userSnapshot.data()?.['profile'] : null; // Cambia 'role' a 'profile'
  }

  // Método para mapear el usuario de Firebase a tu modelo de usuario
  private mapFirebaseUserToCustomUser(
    firebaseUser: any,
    profile: string | null // Cambia 'role' a 'profile'
  ): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      profile: profile || '', // Asegúrate de usar 'profile' aquí
    };
  }

  // Método para manejar errores
  private getErrorMessage(error: any): string {
    console.error('Error de autenticación:', error);
    switch (error.code) {
      case 'auth/user-not-found':
        return 'El usuario no está registrado, regístrese por favor.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intente más tarde.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifique su red.';
      default:
        return 'Error durante la autenticación. Inténtalo de nuevo.';
    }
  }

  // Método para obtener el usuario actual
  get currentUserValue(): User | null {
    if (!this.currentUser) {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }
}
