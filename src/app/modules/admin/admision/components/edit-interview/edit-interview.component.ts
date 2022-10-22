import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.scss']
})
export class EditInterviewComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  isVisible: any;

  isVisible2: any;
  isSelected2: boolean = true;

  ngOnInit(): void {
  }

  close(): void {
    this.dialog.closeAll();
  }

}
