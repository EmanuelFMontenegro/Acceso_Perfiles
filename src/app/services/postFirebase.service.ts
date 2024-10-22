import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore'; // Asegúrate de importar lo necesario
import { Observable } from 'rxjs';
import { Post } from '../models/post.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class PostFirebaseService {
  constructor(private firestore: Firestore) {} // Usar Firestore

  createPost(post: Post): Observable<void> {
    return new Observable<void>((observer) => {
      const postsCollection = collection(this.firestore, 'posts'); // Crear referencia a la colección
      addDoc(postsCollection, post)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error al crear la publicación:', error);
          observer.error(error); // Manejar el error correctamente
        });
    });
  }

  getPosts(): Observable<Post[]> {
    const postsCollection = collection(this.firestore, 'posts'); // Crear referencia a la colección
    return collectionData(postsCollection) as Observable<Post[]>; // Devolver datos de la colección
  }
}
