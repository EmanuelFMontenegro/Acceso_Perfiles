// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private photosUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';

  constructor(private http: HttpClient) {}

  // Método para obtener los posts
  fetchPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Método para crear un nuevo post
  createPost(post: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, post)
      .pipe(catchError(this.handleError));
  }

  // Método para actualizar un post existente
  updatePost(post: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${post.id}`, post)
      .pipe(catchError(this.handleError));
  }

  // Método para eliminar un post
  deletePost(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Método para obtener los comentarios de un post
  fetchComments(postId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/${postId}/comments`)
      .pipe(catchError(this.handleError));
  }

  // Nuevo método para obtener las fotos de un álbum
  fetchPhotos(): Observable<any[]> {
    return this.http
      .get<any[]>(this.photosUrl)
      .pipe(catchError(this.handleError));
  }

  // Método para manejar errores
  private handleError(error: any): Observable<never> {
    console.error('Error en la API:', error);
    return throwError('Error en la solicitud, inténtalo de nuevo más tarde.');
  }
}
