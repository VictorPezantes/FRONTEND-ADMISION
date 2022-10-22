import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import {} from './modal1-create-interview.component.html';

@Component({
  selector: 'modal1',
  templateUrl: './modal1-create-interview.component.html',
  styleUrls: ['./modal1-create-interview.component.scss']
})
export class Modal1CreateInterviewComponent  {
  constructor(public dialog: MatDialog) { }
  
  submit(): void {
    alert("Datos de la entrevista registrados correctamente. Correo enviado")
  }
  close(): void {
    this.dialog.closeAll();
  }

}