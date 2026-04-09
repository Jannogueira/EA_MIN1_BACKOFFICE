import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username === 'admin' && password === 'admin') {
        console.log('Login exitoso');
        this.router.navigate(['/usuarios']);
        } else {
          this.alertaLogin('Error de autenticación', 'El nombre de usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.');
    

      }

    }
  }
  alertaLogin(alerta: string, mensaje: string) {
    const dialogRef = this.dialog.open(Alert, {
      data: { alerta, mensaje }
    });}

}
