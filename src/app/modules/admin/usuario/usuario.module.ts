import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Route, RouterModule } from "@angular/router";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { usuarioComponent } from "./usuario.component";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

const Routes: Route[] = [
    {
        path     : '',
        component: usuarioComponent
    }
];

@NgModule({
    declarations: [
        usuarioComponent
    ],
    imports     : [
        RouterModule.forChild(Routes),
        MatSidenavModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MaterialFileInputModule,
        MatIconModule,
        MatRadioModule,
        MatButtonModule,
        MatTableModule,
        MatMenuModule,
        CommonModule,
        MatPaginatorModule
    ]
})
export class usuariomodule
{
}
