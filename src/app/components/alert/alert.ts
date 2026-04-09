import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-alert',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  alerta: string = '';
  mensaje: string = '';
  data: { alerta: string, mensaje: string };


  constructor(private dialogRef: MatDialogRef<Alert>, @Inject(MAT_DIALOG_DATA) data: { alerta: string, mensaje: string }) {
    this.data = data;
    this.alerta = data.alerta;
    this.mensaje = data.mensaje;

  }
  onNo() {
    this.dialogRef.close(false);
   
  }

  onYes() {
    this.dialogRef.close(true);



  }

    // Lógica para manejar la acción de "Yes"
  }

