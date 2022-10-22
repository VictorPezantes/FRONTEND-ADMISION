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

    addRequestExamen(queryParams): Observable<any> {

        let respuesta;

        for (let index = 0; index < queryParams?.total; index++) {

            let datos = {
                "centroMedicoId": queryParams?.centroMedicoId,
                "fechaInformeMedico": queryParams?.fechaInformeMedico,
                "fechaProgramada": queryParams?.fechaProgramada,
                "fechaResultado": queryParams?.fechaResultado,
                "observacion": queryParams?.observacion,
                "postulanteId": queryParams?.postulantes[index],
                "subEstadoId": queryParams?.subEstadoId,
                "tipoExamenId": queryParams?.tipoExamenId,
                "urlResultadoExamen": queryParams?.urlResultadoExamen
            }

            respuesta = this._httpClient.post(this.apiUrl + 'examen/registrar', datos);

        }

        return respuesta;
    }

}
