import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'app/shared/interfaces/common.interface';

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
            observacion: [null],
        });
    }

}
