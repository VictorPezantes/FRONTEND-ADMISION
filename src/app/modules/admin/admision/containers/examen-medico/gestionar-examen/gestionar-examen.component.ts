import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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

    /*postulantes = new FormControl('');
    tipoExamen = new FormControl('');
    centroMedico = new FormControl('');
    fecha = new FormControl('');*/

    tipoExamenList: TipoExamen[] = [
        { id: 0, nombre: '---- SELECCIONE ----' },
        { id: 1, nombre: 'Fisico' },
        { id: 2, nombre: 'Sangre' }
    ];

    centroMedicoList: centroMedico[] = [
        { id: 0, nombre: '---- SELECCIONE ----' },
        { id: 1, nombre: 'DOS DE MAYO' },
        { id: 2, nombre: 'GOD HOPE' },
        { id: 2, nombre: 'RICARDO PALMA' }
    ];

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
    }

    addExamen(): void {

        if (this.formActions.invalid) {
            return;
        }

        this.formActions.value.fechaProgramada = this.formActions?.value?.fechaProgramada ? moment(this.formActions?.value?.fechaProgramada).format('DD/MM/YYYY HH:mm:ss') : null;
        this.formActions.value.subEstadoId = 1;
        this.formActions.value.fechaInformeMedico = '20/10/2022 00:00:00';
        this.formActions.value.fechaResultado = '20/10/2022 00:00:00';
        this.formActions.value.urlResultadoExamen = 'URL EN TEXTO';
        this.formActions.value.total = this.formActions?.value?.postulantes.length;
        //console.log(this.formActions?.value?.postulantes.length);
        //console.log(this.formActions?.value);

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

}
