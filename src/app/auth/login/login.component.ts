import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule,
  ],
})
export default class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm: FormGroup;
  loginError: string | null = null;
  passwordVisible = false;
  welcomeMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.loading = true;

      this.authService
        .login(formValue.correo, formValue.password)
        .then((user: User | null) => {
          this.loading = false;
          if (user) {

            this.welcomeMessage =
              user.profile === 'admin'
                ? 'Bienvenido Administrador'
                : 'Bienvenido Usuario';
            this.toastr.success('¡Acceso exitoso!', 'Bienvenido');
            this.router.navigate(['/listar-publicaciones']); 
          }
        })
        .catch((error) => {
          this.loading = false;
          this.loginError = this.handleError(error);
          this.toastr.error(this.loginError, 'Error de autenticación');
        });
    } else {
      this.toastr.warning(
        'Por favor completa todos los campos correctamente.',
        'Formulario inválido'
      );
    }
  }

  get passwordIconPath(): string {
    return this.passwordVisible
      ? 'M3.98 8.354A8.978 8.978 0 0012 5.25c2.46 0 4.678.99 6.29 2.563M21 12c-1.5 2.5-4.5 6-9 6-2.603 0-4.946-.806-6.934-2.134M4.515 19.485l15-15'
      : 'M15 12a3 3 0 11-6 0 3 3 0 016 0zm-2 8.485V17H5v5.485M21 12c-1.5 2.5-4.5 6-9 6-2.603 0-4.946-.806-6.934-2.134M4.515 19.485l15-15';
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  private handleError(error: any): string {
    let errorMsg = 'Ocurrió un error. Inténtalo de nuevo.';

    if (error.error && error.error.error && error.error.error.message) {
      switch (error.error.error.message) {
        case 'INVALID_LOGIN_CREDENTIALS':
        case 'auth/invalid-credential':
          errorMsg =
            'Credenciales incorrectas. Verifica tu correo y contraseña.';
          break;
        case 'auth/user-not-found':
          errorMsg =
            'No se encontró un usuario con ese correo. Regístrate, por favor.';
          break;
        case 'auth/wrong-password':
          errorMsg = 'Contraseña incorrecta. Inténtalo de nuevo.';
          break;
        case 'auth/invalid-correo':
          errorMsg = 'El correo debe ser: correo@dominio.com';
          break;
        default:
          errorMsg = 'Error al iniciar sesión. Por favor, inténtalo más tarde.';
      }
    }
    return errorMsg;
  }

  get correoControl() {
    return this.loginForm.get('correo');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
