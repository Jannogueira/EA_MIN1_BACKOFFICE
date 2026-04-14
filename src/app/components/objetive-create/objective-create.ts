import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ObjetivoService } from '../../services/objetivos-service';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-objective-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Navbar],
  templateUrl: './objective-create.html',
  styleUrl: './objective-create.css',
})
export class ObjectiveCreate implements OnInit {
  objectiveForm: FormGroup;
  usuarios: Usuario[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private objetivoService: ObjetivoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.objectiveForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required] // El ID del usuario propietario
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  onSubmit(): void {
    if (this.objectiveForm.valid) {
      this.isSubmitting = true;
      // El backend espera el objeto con { nombre, descripcion, usuario }
      const newObjective = { ...this.objectiveForm.value };
      
      this.objetivoService.createObjetivo(newObjective).subscribe({
        next: () => {
          this.router.navigate(['/objetivos']);
        },
        error: (err) => {
          console.error('Error creating objective:', err);
          this.isSubmitting = false;
        }
      });
    } else {
      this.objectiveForm.markAllAsTouched();
    }
  }
}
