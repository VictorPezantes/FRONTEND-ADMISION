import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { centroMedico, TipoExamen } from 'app/shared/interfaces/common.interface';
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

    addRequestExamen(queryParams): Observable<any> {
        return this._httpClient.post(this.apiUrl + 'examen/registrar', queryParams);;
    }

    getTipoExamen(): Observable<TipoExamen> {
        return this._httpClient.get<TipoExamen>(`${this.apiUrl}tipoexamen/listar/`);
    };

    getCentroMedico(): Observable<centroMedico> {
        return this._httpClient.get<centroMedico>(`${this.apiUrl}centromedico/listar/`);
    };

}
