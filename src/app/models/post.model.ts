export interface Post {
  id?: number; // Opcional, si es generado por el servidor
  userId: number; // Obligatorio
  title: string; // Obligatorio
  body: string; // Obligatorio
}
