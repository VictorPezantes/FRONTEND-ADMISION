import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private apiUrl = environment.apiUrl;
    public eventCreateU: Subject<void> = new Subject<void>();

    constructor(
        private _httpClient: HttpClient,
    ) { }

    getAdmins(queryParams = null): Observable<any> {
        return this._httpClient.get<any>(`${this.apiUrl}auth/listar-usuarios-activos`, { params: queryParams });
    }

}
