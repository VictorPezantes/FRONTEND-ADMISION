import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDialogData } from 'app/shared/interfaces/common.interface';
import { PostulacionesService } from '../../postulaciones.service';

@Component({
    selector: 'app-cancel-process-postulant',
    templateUrl: './cancel-process-postulant.component.html',
    styleUrls: ['./cancel-process-postulant.component.scss']
})
export class CancelProcessPostulantComponent implements OnInit {

    formActions: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<CancelProcessPostulantComponent>,
        private _fb: UntypedFormBuilder,
        private _postulacionService: PostulacionesService,
        private _snackService: MatSnackBar,
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
    }

    setValues(): void {
        //console.log('==>', this.data.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            //observacion: [null, [Validators.required]],
        });
    }

    cancel(): void {

        const data = {
            'id': this.data.meta.id,
            'estadoPostulanteId': 4,
            'subEstadoExamen': 4
        }

        this.cancelProcess(data);
    }

    async cancelProcess(payload): Promise<void> {
        try {
            await this._postulacionService.update(payload).toPromise();
            this._snackService.open('Postulante FUERA DE PROCESO', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await console.log('error');
        }
    }

}
