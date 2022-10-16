import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modal2ManageEvaluationComponent } from './modal2-manage-evaluation.component'

@Component({
    selector: 'modal1',
    templateUrl: './modal1-manage-evaluation.component.html'
})
export class Modal1ManageEvaluationComponent {
    constructor(public dialog: MatDialog) { }

    openModal2() {
        const dialogData = {
            width: '50vw',
            id: 'modal2'
        };

        const dialogRef = this.dialog.open(Modal2ManageEvaluationComponent, dialogData);

        console.log(dialogRef);
    }

    close(): void {
        this.dialog.closeAll();
    }

}