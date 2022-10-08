import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss']
})
export class CreateInterviewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialog.closeAll();
  }

}
