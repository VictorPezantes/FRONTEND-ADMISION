import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'modal3',
    templateUrl: './modal3-manage-evaluation.component.html'
})
export class Modal3ManageEvaluationComponent {
    constructor(public dialog: MatDialog) { }

    manage(): void {
        alert("Email enviado a la empresa evaluadora")
    }

    close(): void {
        this.dialog.closeAll();
    }

}