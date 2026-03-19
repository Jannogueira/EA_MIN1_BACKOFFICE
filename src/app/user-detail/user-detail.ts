import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  
  // Mock data for demonstration
  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    rol: 'user',
    activo: true
  };

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['user', Validators.required],
      activo: [true]
    });
  }

  ngOnInit(): void {
    // Initial load with mock data
    this.userForm.patchValue(this.usuario);
    this.userForm.disable(); // Start in view mode
  }

  toggleEdit(): void {
    this.isEditing = true;
    this.userForm.enable();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.userForm.disable();
    // Restore original mock data
    this.userForm.patchValue(this.usuario);
  }

  saveChanges(): void {
    if (this.userForm.valid) {
      // Logic for saving (in this case just update the mock and switch back)
      this.usuario = { ...this.userForm.value };
      this.isEditing = false;
      this.userForm.disable();
      console.log('User updated (mock):', this.usuario);
    }
  }
}
