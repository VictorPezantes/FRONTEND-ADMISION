import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDialogData } from 'app/shared/interfaces/common.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulacionesService } from '../../postulaciones.service';

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
        private _snackService: MatSnackBar,
        private _ngxSpinnerService: NgxSpinnerService,
        private _postulacionService: PostulacionesService
    ) {
        this.createFormActions();
        this.setValues();
    }

    ngOnInit(): void {
    }

    setValues(): void {
        console.log('==>', this.data.meta);
        //this.formActions.patchValue(this.data?.meta);
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            correos: [null, [Validators.required]],
        });
    }

    enviarEmail(): void {
        if (this.formActions.invalid) {
            return;
        }

        const payload = this.formActions.value;
        const formData = new FormData();

        formData.append('correos', payload.correos);
        formData.append('postulanteId', this.data.meta.id);
        this.sendEmail(formData);
    }

    async sendEmail(payload): Promise<void> {
        try {
            await this._postulacionService.sendEmailCV(payload).toPromise();
            this._snackService.open('Correo ENVIADO correctamente', 'Cerrar', { duration: 2000 });
            this.formActions.reset();
            this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await this._ngxSpinnerService.hide();
        }
    }

}
