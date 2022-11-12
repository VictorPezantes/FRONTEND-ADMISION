import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstadoPostulante, IDialogData } from 'app/shared/interfaces/common.interface';
import { PostulacionesService } from '../../postulaciones.service';

@Component({
    selector: 'app-change-status-postulant',
    templateUrl: './change-status-postulant.component.html',
    styleUrls: ['./change-status-postulant.component.scss']
})
export class ChangeStatusPostulantComponent implements OnInit {

    formActions: FormGroup;
    estadoPostulante: EstadoPostulante[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<ChangeStatusPostulantComponent>,
        private _fb: UntypedFormBuilder,
        private _postulacionService: PostulacionesService,
        private _snackService: MatSnackBar,
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
        this.listaEstadoPostulante();
    }

    get id(): FormControl {
        return this.formActions.get('id') as FormControl;
    }

    setValues(): void {
        //console.log('==>', this.data?.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            estadoPostulanteId: [null, [Validators.required]],
        });
    }

    listaEstadoPostulante() {
        this._postulacionService.getStatusPostulante().subscribe(response => (
            this.estadoPostulante = response
        ));
    }

    cambiarEstadoPostulante(): void {
        const payload = this.formActions.value;

        this._postulacionService.update(payload).subscribe(response => (
            console.log(response)
        ));

        this._snackService.open('Estado modificado correctamente', 'Cerrar', { duration: 2000 });
        this.formActions.reset();
        this.dialogRef.close();

    }

}
