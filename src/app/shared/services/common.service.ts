import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AbstractChoice, Cargo, Departamento, Distrito, Encargado, Estado, Provincia } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = environment.apiUrl;
  id: number;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getStatus(queryParams = null): Observable<Estado[]> {
    return this._httpClient.get<Estado[]>(`${this.apiUrl}estado/listar`, { params: queryParams });
  }

  getPositions(queryParams = null): Observable<AbstractChoice[]> {
    return this._httpClient.get<AbstractChoice[]>(`${this.apiUrl}cargo/listar/`, { params: queryParams });
  }

  getCivilStatus(queryParams = null): Observable<AbstractChoice[]> {
    return this._httpClient.get<AbstractChoice[]>(`${this.apiUrl}estado-civil/listar/`, { params: queryParams });
  }

  getDepartamento(queryParams = null): Observable<Departamento[]> {
    return this._httpClient.get<Departamento[]>(`${this.apiUrl}direccion/listar-departamentos/`, { params: queryParams });
  }

  getProvincia(queryParams = null): Observable<Provincia[]> {
    return this._httpClient.get<Provincia[]>(`${this.apiUrl}direccion/listar-provincias/${queryParams.id}`, { params: queryParams });
  }

  getDistrito(queryParams = null): Observable<Distrito[]> {
    return this._httpClient.get<Distrito[]>(`${this.apiUrl}direccion/listar-distritos/${queryParams.id}`, { params: queryParams });
  }

}
