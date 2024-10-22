import { Injectable, OnInit } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { getDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private currentUser: User | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const user = await this.fetchUserData(firebaseUser.uid);
        if (user) {
          this.setCurrentUser(user);
        } else {
          console.error('No se encontró el usuario en Firestore');
        }
      } else {
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
      }
    });
  }
  ngOnInit(): void {
    this.isLoggedIn();
  }


  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    console.log('el token es ', token);
    return !!token;
  }

  get currentUserValue(): User | null {
    if (!this.currentUser) {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }


  setCurrentUser(user: User): void {
    this.currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }


  private async fetchUserData(userId: string): Promise<User | null> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data() as {
        email: string;
        name: string;
        profile: string;
      };

      return {
        id: userId,
        email: data.email || '',
        name: data.name || '',
        profile: data.profile || '',
      } as User;
    }

    return null;
  }


  login(username: string, password: string): Promise<User | null> {
    return signInWithEmailAndPassword(this.auth, username, password)
      .then(async (userCredential) => {
        const user = await this.fetchUserData(userCredential.user.uid);
        if (user) {
          this.setCurrentUser(user);
          return user;
        } else {
          this.toastr.error(
            'No se encuntra registrado el Usuario,Por favor registralo',
            'Atencion'
          );
          return null;
        }
      })
      .catch((error) => {
        console.error('Error durante la autenticación:', error);
        throw this.getErrorMessage(error);
      });
  }

  async register(
    email: string,
    password: string,
    name: string,
    profile: string = 'user'
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
        profile: profile,
      });

      const newUser: User = {

        id: user.uid,
        email: user.email || '',
        name: name,
        profile: profile,
      };

      this.setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw this.getErrorMessage(error);
    }
  }


  logout(): Promise<void> {
    return this.auth.signOut().then(() => {
      this.currentUser = null;
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    });
  }

  
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
}
