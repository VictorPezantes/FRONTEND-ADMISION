import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-interview',
  templateUrl: './cancel-interview.component.html',
  styleUrls: ['./cancel-interview.component.scss']
})
export class CancelInterviewComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  cancelInterview(): void{
    alert("Entrevista cancelada")
  }

  close(): void {
    this.dialog.closeAll();
  }

}
