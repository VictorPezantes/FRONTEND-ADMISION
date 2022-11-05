import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IPagination, Encargado } from '../../../../../shared/interfaces/common.interface';
import { Postulante } from '../../admision.interface';
import { User } from '../../../../../core/user/user.types';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

  private apiUrl = environment.apiUrl;

  public eventCreate: Subject<void> = new Subject<void>();
  public eventFilters: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _httpClient: HttpClient,
  ) { }

  get(queryParams = null): Observable<IPagination<Postulante>> {
    return this._httpClient.get<IPagination<Postulante>>(`${this.apiUrl}postulante/listar/`, { params: queryParams });
  }

  getExamen(queryParams = null): Observable<IPagination<Postulante>> {
    return this._httpClient.get<IPagination<Postulante>>(`${this.apiUrl}postulante/listarFiltro/`, { params: queryParams });
  }

  create(payload, user: User): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrl}postulante/registrar`, payload);
  }

  update(payload): Observable<any> {
    return this._httpClient.patch<any>(`${this.apiUrl}admision/postulants/${payload.id}/`, payload);
  }

  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}admision/postulants/${id}/`);
  }

  // Enpoint para llenar filtro
  getEncargado(queryParams = null): Observable<Encargado[]> {
    return this._httpClient.get<Encargado[]>(`${this.apiUrl}encargado/lista`, { params: queryParams });
  }

}
