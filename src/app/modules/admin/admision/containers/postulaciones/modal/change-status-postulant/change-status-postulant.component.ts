import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'app/shared/interfaces/common.interface';

@Component({
    selector: 'app-change-status-postulant',
    templateUrl: './change-status-postulant.component.html',
    styleUrls: ['./change-status-postulant.component.scss']
})
export class ChangeStatusPostulantComponent implements OnInit {

    formActions: FormGroup;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<ChangeStatusPostulantComponent>,
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
            estado: [null, [Validators.required]],
        });
    }

}
