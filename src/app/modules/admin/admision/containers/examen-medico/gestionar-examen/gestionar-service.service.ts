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

        let respuesta;

        for (let index = 0; index < queryParams?.total; index++) {

            let datos = {
                "centroMedicoId": queryParams?.centroMedicoId,
                "fechaProgramada": queryParams?.fechaProgramada,
                "observacion": queryParams?.observacion,
                "postulanteId": queryParams?.postulantes[index],
                "tipoExamenId": queryParams?.tipoExamenId,
            }

            respuesta = this._httpClient.post(this.apiUrl + 'examen/registrar', datos);

        }

        return respuesta;
    }

    getTipoExamen(): Observable<TipoExamen> {
        return this._httpClient.get<TipoExamen>(`${this.apiUrl}tipoexamen/listar/`);
    };

    getCentroMedico(): Observable<centroMedico> {
        return this._httpClient.get<centroMedico>(`${this.apiUrl}centromedico/listar/`);
    };

}
