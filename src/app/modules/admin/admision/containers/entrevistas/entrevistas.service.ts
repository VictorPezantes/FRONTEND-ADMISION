import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntrevistasService {

  public eventCreate: Subject<void> = new Subject<void>();
  public interviewSchedule: Subject<void> = new Subject<void>();
  public editInterview: Subject<void> = new Subject<void>();
  public cancelInterview: Subject<void> = new Subject<void>();

  constructor() { }
}
