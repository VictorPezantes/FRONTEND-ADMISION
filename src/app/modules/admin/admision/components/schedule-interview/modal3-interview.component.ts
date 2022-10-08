import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Dialog2Component } from './dialog2.component';
import { Modal2InterviewComponent } from './modal2-interview.component';
import { Router } from '@angular/router';
@Component({
  selector: 'modal3',
  templateUrl: './modal3-interview.component.html'
})
export class Modal3InterviewComponent {
  constructor(
    public dialog: MatDialog,
    private _router: Router
  ) { }

  // openModal2() {
  //   const dialogRef = this.dialog.open(Modal2InterviewComponent, {
  //     id: 'modal2'
  //   });

  //   console.log(dialogRef);
  // }

  close(): void {
    this.dialog.closeAll();
  }

  interviews(): void {
    alert('Entrevista programada con éxito');
    // this._router.navigateByUrl('recursos-humanos/admision/entrevistas');
  }

}