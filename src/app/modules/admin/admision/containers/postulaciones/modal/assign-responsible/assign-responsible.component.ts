import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Encargado, IDialogData } from 'app/shared/interfaces/common.interface';
import { PostulacionesService } from '../../postulaciones.service';
import { AssignResponsibleService } from './assign-responsible.service';

@Component({
    selector: 'app-assign-responsible',
    templateUrl: './assign-responsible.component.html',
    styleUrls: ['./assign-responsible.component.scss']
})
export class AssignResponsibleComponent implements OnInit {

    formActions: FormGroup;
    formActions2: FormGroup;
    encargado: Encargado[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<AssignResponsibleComponent>,
        private _fb: UntypedFormBuilder,
        private _postulacionesService: PostulacionesService,
        private _assignResponsibleService: AssignResponsibleService,
        private _snackService: MatSnackBar,
    ) {
        this.createFormActions();
        this.createFormActions2();
    }

    ngOnInit(): void {
        this.listaEncargados();
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            encargadoId: [null, [Validators.required]],
            postulantes: [null],
        });
    }

    createFormActions2(): void {
        this.formActions2 = this._fb.group({
            id: [null],
            estadoPostulanteId: [null],
        });
    }

    listaEncargados() {
        this._postulacionesService.getEncargado().subscribe(response => (
            this.encargado = response
        ));
    }

    assignResponsable(): void {
        // ASIGNAR ENCARGADO
        const payload = this.formActions.value;
        payload.postulantes = [this.data.meta.id];

        // ACTUALIZAR ESTADO
        const payload2 = this.formActions2.value;
        payload2.id = this.data.meta.id;
        payload2.estadoPostulanteId = 2;
        //payload2.subEstadoExamen = 1;

        console.log(payload2);

        this.createTransaction(payload, payload2);

    }

    async createTransaction(payload, payload2): Promise<void> {
        try {
            await this._assignResponsibleService.assignarResponsable(payload).toPromise();
            await this._postulacionesService.update(payload2).toPromise();
            this._snackService.open('Responsable Asignado Correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err.message);
        }
    }

}
