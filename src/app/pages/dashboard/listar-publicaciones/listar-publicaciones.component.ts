import { Component, OnInit } from '@angular/core';
import { PostFirebaseService } from '../../../services/postFirebase.service'; // Asegúrate de usar el servicio correcto
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr'; // Para manejar notificaciones

@Component({
  selector: 'app-listar-publicaciones',
  standalone: true,
  imports: [CommonModule, CardModule, NgxPaginationModule],
  templateUrl: './listar-publicaciones.component.html',
  styleUrls: ['./listar-publicaciones.component.css'],
})
export class ListarPublicacionesComponent implements OnInit {
  posts: any[] = [];
  page: number = 1; // Página actual
  postsPerPage: number = 4; // Cantidad de publicaciones por página

  constructor(
    private postService: PostFirebaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        this.toastr.error('Error al obtener publicaciones', 'Error');
        console.error('Error al obtener publicaciones', err);
      },
    });
  }
}
