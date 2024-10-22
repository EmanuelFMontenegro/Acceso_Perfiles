import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import AuthRoutingModule from './auth-routing.module';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Importar módulos de PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
    RippleModule, 
    ToastrModule.forRoot(),
    AngularFireAuthModule,
    LoginComponent,
    RegisterComponent,
  ],
  declarations: [],
})
export class AuthModule {}
