import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {Modal1InterviewComponent} from './modal1-interview.component';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.scss']
})
export class ScheduleInterviewComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openModal1() {
    const dialogData = {
      width: '50vw',
      id: 'modal1'
  };

    const dialogRef = this.dialog.open(Modal1InterviewComponent, dialogData);

    console.log(dialogRef);
  }

  close(): void {
    this.dialog.closeAll();
  }
  
}
