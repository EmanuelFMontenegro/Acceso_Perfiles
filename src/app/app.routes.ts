import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import DashboardComponent from './pages/dashboard/dashboard.component';
import { VerUsuariosComponent } from './pages/dashboard/ver-usuarios/ver-usuarios.component';
import { CrearPublicacionComponent } from './pages/dashboard/crear-usuarios/crear-publicacion.component';
import { EliminarUsuariosComponent } from './pages/dashboard/eliminar-usuarios/eliminar-usuarios.component';
import { EditarUsuariosComponent } from './pages/dashboard/editar-usuarios/editar-usuarios.component';
import { ListarPublicacionesComponent } from './pages/dashboard/listar-publicaciones/listar-publicaciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirigir a login
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent, // Utiliza el LayoutComponent como contenedor
    children: [
      {
        path: 'dashboard', // Ruta hija
        component: DashboardComponent, // Directamente referenciando el componente
      },
      { path: 'listar-publicaciones', component: ListarPublicacionesComponent }, // Asegúrate de definir este componente
      { path: 'ver-usuarios', component: VerUsuariosComponent }, // Asegúrate de definir este componente
      { path: 'crear-publicacion', component: CrearPublicacionComponent }, // Asegúrate de definir este componente
      { path: 'editar-usuarios', component: EditarUsuariosComponent }, // Asegúrate de definir este componente
      { path: 'eliminar-usuarios', component: EliminarUsuariosComponent }, // Asegúrate de definir este componente
    ],
  },
];

export { routes };
