import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, TableModule, ButtonModule],
  exports: [UserListComponent], // Exportas el componente para usarlo en otros módulos
})
export class UserModule {}
