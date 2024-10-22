import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Photo } from '../../../models/photo.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, SharedModule], 
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css'],
})
export class VerUsuariosComponent implements OnInit {
  photos: Photo[] = [];
  isLoading = true;
  currentPage = 1;
  itemsPerPage = 4;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPhotos();
  }

  fetchPhotos(): void {
    this.isLoading = true;
    this.apiService.fetchPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al obtener las fotos:', error);
      },
    });
  }
}
