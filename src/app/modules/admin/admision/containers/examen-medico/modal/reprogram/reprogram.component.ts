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
        //console.log('==>', this.data.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            fechaProgramada: ['', Validators.required],
            //observaciones: [this.data?.meta?.encargadoId],
            observaciones: [''],
        });
    }

    reprogram(): void {
        if (this.formActions.invalid) {
            return;
        }
        this.formActions.value.fechaProgramada = this.formActions?.value?.fechaProgramada ? moment(this.formActions?.value?.fechaProgramada).format('DD/MM/YYYY HH:mm:ss') : null;
        this.formActions.value.id = this.data?.meta?.examenId;
        this.formActions.value.subEstadoId = 7;
        //console.log(this.formActions.value);
        this.updateExam(this.formActions.value);
    }

    async updateExam(payload): Promise<void> {
        try {
            await this._examenMedicoService.updateExamen(payload).toPromise();
            this._snackService.open('Examen REPROGRAMADO correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
