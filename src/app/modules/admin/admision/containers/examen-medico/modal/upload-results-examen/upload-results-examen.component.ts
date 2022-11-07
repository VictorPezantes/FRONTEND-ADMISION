import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estado, IDialogData } from 'app/shared/interfaces/common.interface';

@Component({
    selector: 'app-upload-results-examen',
    templateUrl: './upload-results-examen.component.html',
    styleUrls: ['./upload-results-examen.component.scss']
})
export class UploadResultsExamenComponent implements OnInit {

    formActions: FormGroup;
    estado: Estado[] = [
        { id: 1, name: 'APROBADO' },
        { id: 1, name: 'DESAPROBADO' },
        { id: 1, name: 'OBSERVADO' }
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<UploadResultsExamenComponent>,
        private _fb: UntypedFormBuilder,
    ) {
        this.setValues();
        this.createFormActions();
    }

    ngOnInit(): void {
    }

    setValues(): void {
        console.log('==>', this.data.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            idEstado: [null, [Validators.required]],
            archivo: [null, [Validators.required]],
            fechaInformeMedico: [null],
            observacion: [null],
        });
    }

}
