import { Component, OnInit } from '@angular/core';
import { EvaluacionesService } from '../../containers/evaluaciones/evaluaciones.service'

@Component({
  selector: 'app-evaluation-actions',
  templateUrl: './evaluation-actions.component.html',
  styleUrls: ['./evaluation-actions.component.scss']
})
export class EvaluationActionsComponent implements OnInit {

  constructor(
    private _evaluationService: EvaluacionesService
  ) { }

  ngOnInit(): void {
  }

  manageEvaluation(): void {
    this._evaluationService.eventCreate.next();
  }


}
