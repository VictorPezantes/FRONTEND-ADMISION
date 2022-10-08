import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Modal2InterviewComponent} from './modal2-interview.component';

@Component({
  selector: 'modal1',
  templateUrl: './modal1-interview.component.html'
})
export class Modal1InterviewComponent  {
  constructor(public dialog: MatDialog) { }

  openModal2() {
    const dialogData = {
      width: '50vw',
      id: 'modal2'
    };

    const dialogRef = this.dialog.open(Modal2InterviewComponent, dialogData);

    console.log(dialogRef);
  }
  
  close(): void {
    this.dialog.closeAll();
  }

}