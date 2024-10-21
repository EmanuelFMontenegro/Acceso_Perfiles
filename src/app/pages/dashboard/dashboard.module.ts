import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component'; // Asegúrate de importar tu componente Dashboard
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Importar ProgressSpinnerModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule si lo necesitas
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { EliminarUsuariosComponent } from './eliminar-usuarios/eliminar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { RecursosDeUsuariosComponent } from './recursos-de-usuarios/recursos-de-usuarios.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    DashboardComponent, // Declarar el DashboardComponent aquí
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule, // Importar el módulo de ProgressSpinner
    FormsModule,
    ToolbarModule,
    ButtonModule,
    DashboardRoutingModule,
    CrearUsuariosComponent,
    VerUsuariosComponent,
    EliminarUsuariosComponent,
    EditarUsuariosComponent,
    RecursosDeUsuariosComponent,
  ],
  exports: [
    DashboardComponent, // Exportar el DashboardComponent si se va a utilizar en otros módulos
  ],
})
export class DashboardModule {}
