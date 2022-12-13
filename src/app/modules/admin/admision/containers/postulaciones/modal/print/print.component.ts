import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'app/shared/interfaces/common.interface';
import { PostulacionesService } from '../../postulaciones.service';

@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

    cvPostulante: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData<any>,
        public dialogRef: MatDialogRef<PrintComponent>,
        private _postulacionService: PostulacionesService,
    ) { }

    ngOnInit(): void {
        this.getCv(this.data?.meta?.id);
    }

    async getCv(payload): Promise<void> {
        try {
            const mensaje = await this._postulacionService.getCV(payload).toPromise();
            this.cvPostulante = mensaje.data;
            console.log(this.cvPostulante);
        } catch (err) {
            throw new Error(err);
        }
    }

}
