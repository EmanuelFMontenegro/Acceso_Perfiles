import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Para formularios reactivos
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import AuthRoutingModule from './auth-routing.module';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Importar módulos de PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox'; // Para el checkbox en el formulario
import { CardModule } from 'primeng/card'; // Para usar <p-card>
import { RippleModule } from 'primeng/ripple'; // Para efectos en botones

import { ToastrModule } from 'ngx-toastr'; // Importar ToastrModule

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule, // Para formularios reactivos
    FormsModule, // Agregar FormsModule aquí
    ButtonModule, // Módulo para los botones PrimeNG
    InputTextModule, // Módulo para inputs PrimeNG
    CheckboxModule, // Para el checkbox en el formulario
    CardModule, // Para usar <p-card>
    RippleModule, // Para el efecto de ripple en botones
    ToastrModule.forRoot(),
    AngularFireAuthModule,
  ],
  declarations: [LoginComponent, RegisterComponent], // Declarar LoginComponent y RegisterComponent
})
export class AuthModule {}
