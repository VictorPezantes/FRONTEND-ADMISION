import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getAdmins(queryParams = null): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}auth/listar-usuarios-activos`, { params: queryParams });
}

}
