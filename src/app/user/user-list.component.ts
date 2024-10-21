import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Lista de usuarios

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  editUser(user: User) {
    // Lógica para editar el usuario
    console.log('Edit user:', user);
  }

  deleteUser(userId: number) {
    // Lógica para eliminar el usuario
    console.log('Delete user with ID:', userId);
  }

  addUser() {
    // Lógica para agregar un nuevo usuario
    console.log('Add new user');
  }
}
