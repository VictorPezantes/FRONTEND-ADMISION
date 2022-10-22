import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Modal1ManageEvaluationComponent} from './modal1-manage-evaluation.component'

@Component({
  selector: 'app-manage-evaluation',
  templateUrl: './manage-evaluation.component.html',
  styleUrls: ['./manage-evaluation.component.scss']
})
export class ManageEvaluationComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModal1() {
    const dialogData = {
      width: '50vw',
      id: 'modal1'
  };

    const dialogRef = this.dialog.open(Modal1ManageEvaluationComponent, dialogData);

    console.log(dialogRef);
  }

  close(): void {
    this.dialog.closeAll();
  }

}
