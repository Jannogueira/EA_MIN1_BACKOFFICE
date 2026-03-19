import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../models/usuario';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Universidad } from '../models/universidad';
import { UsuarioService } from '../services/usuario-service';


@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  searchControl = new FormControl('');
  loading = false;
  errorMsg = '';
  mostrarForm = false;
  usuarioForm!: FormGroup;
  editando = false;
  usuarioEditId: string | null = null;
  expanded: { [key: string]: boolean } = {};
  limite = 10;
  mostrarTodosUsuarios = false;
  expandedIds: { [key: string]: boolean } = {};


  constructor(private api: UsuarioService, private cdr: ChangeDetectorRef) {
    this.searchControl = new FormControl('');
  }

  //Función: leer
  ngOnInit(): void {
    this.load();
    
    //Buscador de usuarios por nombre
    this.searchControl.valueChanges.subscribe(value => {
      const term = value?.toLowerCase() ?? '';
  
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(term)
      );
    });
  }

  load(): void {
    this.loading = true;
    this.errorMsg = '';
    this.cdr.detectChanges();

    this.api.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.usuariosFiltrados = [...this.usuarios];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se han podido cargar los usuarios.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  
  //Función: obtener nombre de universidad para mostrar en la tabla
  universidadLabel(u: Usuario): string {
    const org = u.universidad;
    if (!org) return '-';
    if (typeof org === 'string') return org; 
    return (org as Universidad).nombre ?? '-';
  }

  //Función: mostrar formulario
mostrarFormulario(): void {
  this.mostrarForm = true;
}

trackById(_index: number, u: Usuario): string {
  return u._id;
}

//Función: mostrar más
  mostrarMas(): void {
  this.mostrarTodosUsuarios = true;
  } 

  get usuariosVisibles(): Usuario[] {
    if (this.mostrarTodosUsuarios) {
      return this.usuariosFiltrados;
    }
    return this.usuariosFiltrados.slice(0, this.limite);
  }


toggleId(id: string) {
  this.expandedIds[id] = !this.expandedIds[id];
}

}
