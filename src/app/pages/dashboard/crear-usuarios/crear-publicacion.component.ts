import { Component, OnInit } from '@angular/core';
import { PostFirebaseService } from '../../../services/postFirebase.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html', // Verifica que esta ruta sea correcta
})
export class CrearPublicacionComponent implements OnInit {
  nuevoPost: Post = { id: 0, userId: 1, title: '', body: '' };
  posts: Post[] = [];

  constructor(
    private post: PostFirebaseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  crearPublicacion(): void {
    this.post.createPost(this.nuevoPost).subscribe({
      next: () => {
        this.loadPosts();
        this.nuevoPost = { id: 0, userId: 1, title: '', body: '' };
        this.toastr.success('Publicación creada con éxito', 'Éxito');
      },
      error: (error) => {
        this.toastr.error('Error al crear la publicación', 'Error');
        console.error('Error al crear la publicación:', error);
      },
    });
  }

  loadPosts(): void {
    this.post.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        this.toastr.error('Error al cargar las publicaciones', 'Error');
        console.error('Error al cargar publicaciones:', error);
      },
    });
  }
}
