import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideAnimations,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment.prod';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http'; // Importar HttpClientModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    BrowserAnimationsModule,
    provideAnimations(),
    provideToastr({
      timeOut: 3000, // Duración del mensaje en milisegundos
      positionClass: 'toast-top-right', // Posición de la notificación
      preventDuplicates: true, // Evita duplicar mensajes iguales
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase
    provideAuth(() => getAuth()), // Proporciona el servicio de autenticación
    provideFirestore(() => getFirestore()), // Proporciona Firestore
    provideHttpClient(), // Proveedor de HttpClient para toda la aplicación
  ],
};
