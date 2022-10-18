import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionarServiceService {

  private apiUrl = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  addExamen(queryParams = null): Observable<any> {
    return this._httpClient.post(this.apiUrl + 'examen/registrar', { params: queryParams });
}

}
