import { Component, OnInit } from '@angular/core';
import { EntrevistasService } from '../../containers/entrevistas/entrevistas.service'

@Component({
  selector: 'app-interview-actions',
  templateUrl: './interview-actions.component.html',
  styleUrls: ['./interview-actions.component.scss']
})
export class InterviewActionsComponent implements OnInit {

  constructor(
    private _interviewService: EntrevistasService
  ) { }

  ngOnInit(): void {
  }

  createInterview(): void {
    this._interviewService.eventCreate.next();
  }

  scheduleInterview(): void {
    this._interviewService.interviewSchedule.next();
  }


}
