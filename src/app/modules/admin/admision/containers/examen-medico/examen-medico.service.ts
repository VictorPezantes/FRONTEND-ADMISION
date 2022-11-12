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

  getStatusResult(queryParams = null): Observable<void> { // LISTA DE TABLA ESTADO_RESULTADO_EXAMEN
    return this._httpClient.delete<void>(`${this.apiUrl}examen/cancelar/`, { params: queryParams });
  }

  delete(queryParams = null): Observable<void> { // CANCELA EXAMEN FALTA LISTAR IDEXAMEN
    return this._httpClient.delete<void>(`${this.apiUrl}examen/cancelar/`, { params: queryParams });
  }

  uploadFile(payload): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}examen/registrarResultado`, payload);
  }

}
