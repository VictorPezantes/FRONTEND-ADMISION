import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-load-results-evaluation',
  templateUrl: './load-results-evaluation.component.html',
  styleUrls: ['./load-results-evaluation.component.scss']
})
export class LoadResultsEvaluationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  save() {
    alert("Resultados guardados")
  }

  close(): void {
    this.dialog.closeAll();
  }
}

