import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ObjetivoService } from '../../services/objetivos-service';
import { Objetivo, Fita } from '../../models/objetivo';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-objective-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Navbar],
  templateUrl: './objective-detail.html',
  styleUrl: './objective-detail.css',
})
export class ObjectiveDetail implements OnInit {
  objectiveForm: FormGroup;
  objectiveId: string | null = null;
  objective?: Objetivo;

  isEditingNombre = false;
  isEditingDescripcion = false;
  newFitaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private objetivoService: ObjetivoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.objectiveForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.newFitaForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.objectiveId = id;
        this.loadObjective();
      }
    });
  }

  loadObjective(): void {
    if (!this.objectiveId) return;
    
    this.objetivoService.getObjetivo(this.objectiveId).subscribe({
      next: (data) => {
        // Clonamos el objeto para asegurar que Angular detecte el cambio de referencia
        this.objective = { ...data };
        
        this.objectiveForm.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion
        });

        // Forzamos la detección de cambios de forma asíncrona
        setTimeout(() => {
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error al cargar objetivo:', err)
    });
  }

  get progressPercentage(): number {
    if (!this.objective?.fites || this.objective.fites.length === 0) return 0;
    const completed = this.objective.fites.filter(f => f.estado === true).length;
    return Math.round((completed / this.objective.fites.length) * 100);
  }

  toggleFitaStatus(fita: Fita): void {
    const updatedFita = { ...fita, estado: !fita.estado };
    this.objetivoService.updateFita(this.objectiveId!, fita._id, updatedFita).subscribe({
      next: (updatedObj) => {
        this.objective = { ...updatedObj };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error toggling milestone status:', err)
    });
  }

  addMilestone(): void {
    if (this.newFitaForm.valid) {
      const fitaData = {
        descripcion: this.newFitaForm.value.descripcion,
        estado: false
      };
      this.objetivoService.addFita(this.objectiveId!, fitaData).subscribe({
        next: (updatedObj) => {
          this.objective = { ...updatedObj };
          this.newFitaForm.reset();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error adding milestone:', err)
      });
    }
  }

  deleteMilestone(fitaId: string): void {
    this.objetivoService.deleteFita(this.objectiveId!, fitaId).subscribe({
      next: (updatedObj) => {
        this.objective = { ...updatedObj };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error deleting milestone:', err)
    });
  }

  toggleEdit(field: 'nombre' | 'descripcion'): void {
    if (field === 'nombre') this.isEditingNombre = true;
    if (field === 'descripcion') this.isEditingDescripcion = true;
    this.cdr.detectChanges();
  }

  cancelEdit(field: 'nombre' | 'descripcion'): void {
    if (field === 'nombre') {
      this.isEditingNombre = false;
      this.objectiveForm.patchValue({ nombre: this.objective?.nombre });
    }
    if (field === 'descripcion') {
      this.isEditingDescripcion = false;
      this.objectiveForm.patchValue({ descripcion: this.objective?.descripcion });
    }
    this.cdr.detectChanges();
  }

  saveField(field: 'nombre' | 'descripcion'): void {
    if (this.objectiveForm.valid && this.objectiveId) {
      const dataToUpdate = { [field]: this.objectiveForm.get(field)?.value };
      this.objetivoService.updateObjetivo(this.objectiveId, dataToUpdate as any).subscribe({
        next: (updatedObj) => {
          this.objective = { ...updatedObj };
          if (field === 'nombre') this.isEditingNombre = false;
          if (field === 'descripcion') this.isEditingDescripcion = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error updating objective:', err)
      });
    }
  }
}
