import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estado, IDialogData } from 'app/shared/interfaces/common.interface';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExamenMedicoService } from '../../examen-medico.service';

@Component({
    selector: 'app-upload-results-examen',
    templateUrl: './upload-results-examen.component.html',
    styleUrls: ['./upload-results-examen.component.scss']
})
export class UploadResultsExamenComponent implements OnInit {

    formActions: FormGroup;
    formData = new FormData();
    estado: Estado[] = [
        { id: 1, name: 'APROBADO' },
        { id: 2, name: 'DESAPROBADO' },
        { id: 3, name: 'OBSERVADO' }
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<UploadResultsExamenComponent>,
        private _fb: UntypedFormBuilder,
        private _snackService: MatSnackBar,
        private _ngxSpinnerService: NgxSpinnerService,
        private _examenMedicoService: ExamenMedicoService
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
        /*this._commonService.getProvincia(option).subscribe(provincias => {
            this.provincia = provincias;
        });*/
    }

    setValues(): void {
        console.log(this.data?.meta);
        this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            idEstado: [null, [Validators.required]],
            archivo: ['', [Validators.required]],
            fechaResultado: ['', Validators.required]
        });
    }

    uploadResultado(event): any {
        const archivo = event.target.files[0];
        this.formData.append('resultadoExamen', archivo);
    }


    UploadResults(): void {
        if (this.formActions.valid) {

            const payload = this.formActions.value;

            this.formData.append('estadoResultadoExamenId', payload.idEstado);
            this.formData.append('examenId', this.data?.meta?.examenId);
            this.formData.append('fechaResultado', payload.fechaResultado ? moment(payload.fechaResultado).format('DD/MM/YYYY') : null);
            this.formData.append('fechaInformeMedico', payload.fechaResultado ? moment(payload.fechaResultado).format('DD/MM/YYYY') : null);

            this.upload(this.formData);

        } else {
            this.formActions.markAllAsTouched();
        }
    }

    async upload(payload): Promise<void> {
        try {
            await this._examenMedicoService.uploadFile(payload).toPromise();
            this._snackService.open('Archivos Cargados correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
