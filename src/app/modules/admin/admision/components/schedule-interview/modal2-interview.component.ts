import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Modal3InterviewComponent} from './modal3-interview.component';

@Component({
  selector: 'modal2',
  templateUrl: './modal2-interview.component.html'
})
export class Modal2InterviewComponent  {
  constructor(public dialog: MatDialog) { }

  isVisible: any;
  isSelected: boolean = true;

  openModal3() {
    const dialogData = {
      width: '50vw',
      id: 'modal3'
    };
    const dialogRef = this.dialog.open(Modal3InterviewComponent, dialogData);

    console.log(dialogRef);
  }

  close(): void {
    this.dialog.closeAll();
  }
  
}