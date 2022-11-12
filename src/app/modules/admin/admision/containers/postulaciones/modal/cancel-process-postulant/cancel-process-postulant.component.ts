import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'app/shared/interfaces/common.interface';

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
            observacion: [null, [Validators.required]],
        });
    }

}
