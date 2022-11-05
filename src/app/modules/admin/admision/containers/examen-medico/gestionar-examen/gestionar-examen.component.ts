import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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
    ) {
        this.createFormActions();
    }

    ngOnInit(): void {
        this._postulacionService.get().subscribe(response => (this.postulant = response.content));
        this.listaTipoExamen();
        this.listaCentroMedico();
    }

    addExamen(): void {
        if (this.formActions.invalid) {
            return;
        }
        this.formActions.value.fechaProgramada = this.formActions?.value?.fechaProgramada ? moment(this.formActions?.value?.fechaProgramada).format('DD/MM/YYYY HH:mm:ss') : null;
        this.formActions.value.total = this.formActions?.value?.postulantes.length;
        this._gestionarServiceService.addRequestExamen(this.formActions?.value).subscribe((response) => {
            console.log(response);
        });
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            postulantes: ['', Validators.required],
            tipoExamenId: ['', Validators.required],
            centroMedicoId: ['', Validators.required],
            fechaProgramada: ['', Validators.required],
            observacion: [''],
        });
    }

    listaTipoExamen() {
        this._gestionarServiceService.getTipoExamen().subscribe(response => (
            this.tipoExamenList = response
        ));
    }

    listaCentroMedico() {
        this._gestionarServiceService.getCentroMedico().subscribe(response => (
            this.centroMedicoList = response
        ));
    }

}
