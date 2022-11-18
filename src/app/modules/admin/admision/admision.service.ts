import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmisionService {

  title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public idPostulante: any;
  //@Output() disparador: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
