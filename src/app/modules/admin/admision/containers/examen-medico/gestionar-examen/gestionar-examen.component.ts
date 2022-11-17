import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { centroMedico, TipoExamen } from 'app/shared/interfaces/common.interface';
import moment from 'moment';
import { Postulante } from '../../../admision.interface';
import { PostulacionesService } from '../../postulaciones/postulaciones.service';
import { GestionarServiceService } from './gestionar-service.service';

@Component({
    selector: 'app-gestionar-examen',
    templateUrl: './gestionar-examen.component.html',
    styleUrls: ['./gestionar-examen.component.scss']
})
export class GestionarExamenComponent implements OnInit {

    formActions: FormGroup;
    tipoExamenList: TipoExamen;
    centroMedicoList: centroMedico;
    postulant: Postulante[] = [];

    constructor(
        private _postulacionService: PostulacionesService,
        private _gestionarServiceService: GestionarServiceService,
        private _fb: UntypedFormBuilder,
        private _snackService: MatSnackBar,
    ) {
        this.createFormActions();
    }

    ngOnInit(): void {
        this.listaPostulantes();
        this.listaTipoExamen();
        this.listaCentroMedico();
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            listaPostulante: ['', Validators.required],
            tipoExamenId: ['', Validators.required],
            centroMedicoId: ['', Validators.required],
            fechaProgramada: ['', Validators.required],
            observacion: [''],
        });
    }

    addExamen(): void {
        if (this.formActions.invalid) {
            return;
        }
        this.formActions.value.fechaProgramada = this.formActions?.value?.fechaProgramada ? moment(this.formActions?.value?.fechaProgramada).format('DD/MM/YYYY HH:mm:ss') : null;
        this.formActions.value.subEstadoId = 1;

        this.createExamen(this.formActions?.value);
    }

    async createExamen(payload): Promise<void> {
        try {
            await this._gestionarServiceService.addRequestExamen(payload).toPromise();
            this._snackService.open('Examen PROGRAMADO correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
        } catch (err) {
            //throw new Error(err);
            console.log('error');
        }
    }

    listaTipoExamen() {
        this._gestionarServiceService.getTipoExamen().subscribe(response => (this.tipoExamenList = response));
    }

    listaCentroMedico() {
        this._gestionarServiceService.getCentroMedico().subscribe(response => (this.centroMedicoList = response));
    }

    listaPostulantes() {
        const datosFiltro = {
            estadoPostulanteId: 5,
            subEstadoExamen: 7
        };
        this._postulacionService.getPostulantes(datosFiltro).subscribe(response => (this.postulant = response.content));
    }

}
