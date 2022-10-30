import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Encargado, IDialogData } from 'app/shared/interfaces/common.interface';
import { PostulacionesService } from '../../postulaciones.service';

@Component({
    selector: 'app-assign-responsible',
    templateUrl: './assign-responsible.component.html',
    styleUrls: ['./assign-responsible.component.scss']
})
export class AssignResponsibleComponent implements OnInit {

    formActions: FormGroup;
    encargado: Encargado[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<AssignResponsibleComponent>,
        private _fb: UntypedFormBuilder,
        private _postulacionesService: PostulacionesService,
    ) {
        this.setValues();
        this.createFormActions();
    }

    ngOnInit(): void {
        this.listaEncargados();
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        //this.formActions.patchValue(this.data?.meta);
        //this.datosID = this.data.meta.id;
        //console.log(this.datosID); // FALTA SETEAR EL DATO DEL ID
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            idResponsable: [null, [Validators.required]],
        });
    }

    listaEncargados() {
        this._postulacionesService.getEncargado().subscribe(response => (
            this.encargado = response
        ));
    }

}
