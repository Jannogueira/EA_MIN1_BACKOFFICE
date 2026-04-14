import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Objetivo } from '../../models/objetivo';
import { ObjetivoService } from '../../services/objetivos-service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-objective-dashboard',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Navbar],
  standalone: true,
  templateUrl: './objective-dashboard.html',
  styleUrl: './objective-dashboard.css',
})
export class ObjectiveDashboard implements OnInit {
  objetivos: Objetivo[] = [];
  objetivosFiltrados: Objetivo[] = [];
  searchControl = new FormControl('');
  loading = false;
  errorMsg = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 5;

  // Modal state
  showDeleteModal = false;
  objetivoToDelete: Objetivo | null = null;

  constructor(
    private objetivoService: ObjetivoService, 
    private cdr: ChangeDetectorRef, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
    
    this.searchControl.valueChanges.subscribe(value => {
      const term = value?.toLowerCase() ?? '';
      this.objetivosFiltrados = this.objetivos.filter(obj =>
        obj.nombre.toLowerCase().includes(term) ||
        obj.descripcion.toLowerCase().includes(term) ||
        obj.usuario?.nombre.toLowerCase().includes(term)
      );
      this.currentPage = 1;
    });
  }

  load(): void {
    this.loading = true;
    this.errorMsg = '';
    this.cdr.detectChanges();

    this.objetivoService.getObjetivos().subscribe({
      next: (res) => {
        this.objetivos = res;
        this.objetivosFiltrados = [...this.objetivos];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se han podido cargar los objetivos.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get objetivosVisibles(): Objetivo[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.objetivosFiltrados.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.objetivosFiltrados.length / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getInitials(name: string): string {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  verDetalle(objetivo: Objetivo): void {
    this.router.navigate(['/objetivo', objetivo._id]);
  }

  openDeleteModal(objetivo: Objetivo): void {
    this.objetivoToDelete = objetivo;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.objetivoToDelete = null;
  }

  confirmDelete(): void {
    if (this.objetivoToDelete) {
      this.objetivoService.deleteObjetivo(this.objetivoToDelete._id).subscribe({
        next: () => {
          this.load();
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting objective:', err);
          this.closeDeleteModal();
        }
      });
    }
  }
}
