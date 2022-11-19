import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AdmisionService } from '../../../admision.service';

@Component({
    selector: 'app-ficha-postulant',
    templateUrl: './ficha-postulant.component.html',
    styleUrls: ['./ficha-postulant.component.scss']
})
export class FichaPostulantComponent implements OnInit {

    formDatos: FormGroup;
    formFamiliares: FormGroup;
    dataSource: any;

    constructor(
        private _admisionService: AdmisionService,
        private _fb: UntypedFormBuilder
    ) {
        this._admisionService.title.next('Ficha de Datos Personales');
        this.createFormDatos();
        this.createFormFamiliares();
    }

    ngOnInit(): void {
        this.dataSource = this._admisionService.postulante;
    }

    createFormDatos(): void {
        this.formDatos = this._fb.group({
            nacionalidad: ['', Validators.required],
            grupoSanguineo: ['', Validators.required],
            sabeNadar: ['', Validators.required],
            fechaMatrimonio: ['', Validators.required],
            lugarNacimiento: ['', Validators.required],
            tDocumento: ['', Validators.required],
            nDocumento: ['', Validators.required],
            fechaEmision: ['', Validators.required],
            fechaVencimiento: ['', Validators.required],
            lugarEmision: ['', Validators.required],
            ubigeo: ['', Validators.required],
            gVotacion: ['', Validators.required]
        });
    }

    createFormFamiliares(): void {
        this.formFamiliares = this._fb.group({
            primerNombre: ['', Validators.required],
            segundoNombre: ['', Validators.required],
            primerApellido: ['', Validators.required],
            segundoApellido: ['', Validators.required],
        });
    }

}
