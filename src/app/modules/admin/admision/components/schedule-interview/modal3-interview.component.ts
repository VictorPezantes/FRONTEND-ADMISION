import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal3',
  templateUrl: './modal3-interview.component.html'
})
export class Modal3InterviewComponent {
  constructor(
    public dialog: MatDialog,
  ) { }

  close(): void {
    this.dialog.closeAll();
  }

  interviews(): void {
    alert('Entrevista programada con éxito');
  }

}