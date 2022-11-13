import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDialogData } from 'app/shared/interfaces/common.interface';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExamenMedicoService } from '../../examen-medico.service';

@Component({
    selector: 'app-reprogram',
    templateUrl: './reprogram.component.html',
    styleUrls: ['./reprogram.component.scss']
})
export class ReprogramComponent implements OnInit {

    formActions: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<ReprogramComponent>,
        private _fb: UntypedFormBuilder,
        private _snackService: MatSnackBar,
        private _ngxSpinnerService: NgxSpinnerService,
        private _examenMedicoService: ExamenMedicoService
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [''],
            //subEstadoId: [''],
            fechaProgramada: ['', Validators.required]
        });
    }

    reprogram(): void {
        if (this.formActions.invalid) {
            return;
        }
        this.formActions.value.fechaProgramada = this.formActions?.value?.fechaProgramada ? moment(this.formActions?.value?.fechaProgramada).format('DD/MM/YYYY HH:mm:ss') : null;
        this.formActions.value.subEstadoId = '3';
        //console.log(this.formActions.value);
        this.updateExam(this.formActions.value);
    }

    async updateExam(payload): Promise<void> {
        try {
            await this._examenMedicoService.reprogramExam(payload).toPromise();
            this._snackService.open('Examen reprogramado correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
