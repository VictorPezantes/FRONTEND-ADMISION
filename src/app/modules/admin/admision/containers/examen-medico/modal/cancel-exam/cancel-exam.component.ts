import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDialogData } from 'app/shared/interfaces/common.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulacionesService } from '../../../postulaciones/postulaciones.service';
import { ExamenMedicoService } from '../../examen-medico.service';

@Component({
    selector: 'app-cancel-exam',
    templateUrl: './cancel-exam.component.html',
    styleUrls: ['./cancel-exam.component.scss']
})
export class CancelExamComponent implements OnInit {

    formActions: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<CancelExamComponent>,
        private _fb: UntypedFormBuilder,
        private _snackService: MatSnackBar,
        private _ngxSpinnerService: NgxSpinnerService,
        private _examenMedicoService: ExamenMedicoService,
        private _postulacionService: PostulacionesService,
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
            id: [null],
            observaciones: [null],
        });
    }

    cancel(): void {
        if (this.formActions.invalid) {
            return;
        }
        //this.formActions.value.id = this.data?.meta?.examenId;
        this.formActions.value.subEstadoId = 4;
        //console.log(this.formActions.value);
        this.updateExam(this.formActions.value);
    }

    async updateExam(payload): Promise<void> {
        try {
            await this._postulacionService.update(payload).toPromise();
            this._snackService.open('Examen CANCELADO correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
