import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignResponsibleService {

  private apiUrl = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  assignarResponsable(payload): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}encargado/asignarPostulante`, payload);
  }

}
