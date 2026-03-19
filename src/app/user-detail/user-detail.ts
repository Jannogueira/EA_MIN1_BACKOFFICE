import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit {
  userForm: FormGroup;
  isEditing = false;
  userId: string | null = null;
  usuario?: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['user', Validators.required],
      password: [''] // Password control
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUser();
    }
  }

  loadUser(): void {
    this.usuarioService.getUsuario(this.userId!).subscribe({
        next: (user) => {
            this.usuario = user;
            this.userForm.patchValue({
              nombre: user.nombre,
              email: user.email,
              rol: user.rol,
              password: '' // Always empty initially
            });
            this.userForm.disable();
        },
        error: (err) => console.error('Error loading user:', err)
    });
  }

  toggleEdit(): void {
    this.isEditing = true;
    this.userForm.enable();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.userForm.disable();
    if (this.usuario) {
      this.userForm.patchValue({
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        rol: this.usuario.rol,
        password: ''
      });
    }
  }

  saveChanges(): void {
    if (this.userForm.valid && this.userId) {
      const dataToUpdate = { ...this.userForm.value };
      
      // If password is not provided, do not send it to avoid clearing it or backend errors
      if (!dataToUpdate.password || dataToUpdate.password.trim() === '') {
        delete dataToUpdate.password;
      }

      this.usuarioService.updateUsuario(this.userId, dataToUpdate).subscribe({
        next: (updatedUser) => {
          this.usuario = updatedUser;
          this.isEditing = false;
          this.userForm.disable();
          this.userForm.patchValue({ password: '' }); // Clear field after save
        },
        error: (err) => console.error('Error updating user:', err)
      });
    }
  }
}
