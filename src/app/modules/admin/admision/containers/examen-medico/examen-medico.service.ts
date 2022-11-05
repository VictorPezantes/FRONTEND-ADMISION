import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenMedicoService {

  private apiUrl = environment.apiUrl;

  public eventCreate: Subject<void> = new Subject<void>();
  public eventFilters: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _httpClient: HttpClient,
  ) { }

  delete(queryParams = null): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}examen/cancelar/`, { params: queryParams });
  }

}
