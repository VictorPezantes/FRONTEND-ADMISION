import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modal3ManageEvaluationComponent } from './modal3-manage-evaluation.component'

@Component({
    selector: 'modal2',
    templateUrl: './modal2-manage-evaluation.component.html'
})
export class Modal2ManageEvaluationComponent {
    constructor(public dialog: MatDialog) { }

    openModal3() {
        const dialogData = {
            width: '50vw',
            id: 'modal3'
        };

        const dialogRef = this.dialog.open(Modal3ManageEvaluationComponent, dialogData);

        console.log(dialogRef);
    }

    close(): void {
        this.dialog.closeAll();
    }

}