import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'app/shared/interfaces/common.interface';

@Component({
    selector: 'app-send-email',
    templateUrl: './send-email.component.html',
    styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

    formActions: FormGroup;
    datosID = 0;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<SendEmailComponent>,
        private _fb: UntypedFormBuilder,
    ) {
        this.setValues();
        this.createFormActions();
    }

    ngOnInit(): void {
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        //this.formActions.patchValue(this.data?.meta);
        //this.datosID = this.data.meta.id;
        //console.log(this.datosID); // FALTA SETEAR EL DATO DEL ID
        }

    createFormActions(): void {
        this.formActions = this._fb.group({
            id: [null],
            email: [null, [Validators.required]],
        });
    }

}
