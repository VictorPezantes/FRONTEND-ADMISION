import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmisionComponent } from './admision.component';
import { PostulacionesComponent } from './containers/postulaciones/postulaciones.component';
import { OfertasComponent } from './containers/ofertas/ofertas.component';
import { EntrevistasComponent } from './containers/entrevistas/entrevistas.component';
import { ExamenMedicoComponent } from './containers/examen-medico/examen-medico.component';
import { EvaluacionesComponent } from './containers/evaluaciones/evaluaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './containers/configuracion/configuracion.component';
import { OfferFiltersComponent } from './components/offer-filters/offer-filters.component';
import { OfferActionsComponent } from './components/offer-actions/offer-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeStatusComponent } from './components/change-status/change-status.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../../../shared/shared.module';
import { PostulantFiltersComponent } from './components/postulant-filters/postulant-filters.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { CreatePostulantComponent } from './components/create-postulant/create-postulant.component';
import { ViewInformationComponent } from './components/view-information/view-information.component';
import { HistoryPostulantComponent } from './containers/postulaciones/history-postulant/history-postulant.component';
import { FichaPostulantComponent } from './containers/postulaciones/ficha-postulant/ficha-postulant.component';
import { CreateInterviewComponent } from './components/create-interview/create-interview.component';
import { InterviewActionsComponent } from './components/interview-actions/interview-actions.component';
import { ScheduleInterviewComponent } from './components/schedule-interview/schedule-interview.component';
import { Modal2InterviewComponent } from './components/schedule-interview/modal2-interview.component';
import { EditInterviewComponent } from './components/edit-interview/edit-interview.component';
import { CancelInterviewComponent } from './components/cancel-interview/cancel-interview.component';
import { Modal1CreateInterviewComponent } from './components/create-interview/modal1-create-interview.component';
import { EvaluationActionsComponent } from './components/evaluation-actions/evaluation-actions.component';
import { ManageEvaluationComponent } from './components/manage-evaluation/manage-evaluation.component';
import { Modal1ManageEvaluationComponent } from './components/manage-evaluation/modal1-manage-evaluation.component';
import { Modal2ManageEvaluationComponent } from './components/manage-evaluation/modal2-manage-evaluation.component';
import { Modal3ManageEvaluationComponent } from './components/manage-evaluation/modal3-manage-evaluation.component';
import { Modal1InterviewComponent } from './components/schedule-interview/modal1-interview.component';
import { Modal3InterviewComponent } from './components/schedule-interview/modal3-interview.component';
import { LoadResultsEvaluationComponent } from './components/load-results-evaluation/load-results-evaluation.component';
import { GestionarExamenComponent } from './containers/examen-medico/gestionar-examen/gestionar-examen.component';
import { SendEmailComponent } from './containers/postulaciones/modal/send-email/send-email.component';
import { AssignResponsibleComponent } from './containers/postulaciones/modal/assign-responsible/assign-responsible.component';
import { ReprogramComponent } from './containers/examen-medico/modal/reprogram/reprogram.component';
import { CancelExamComponent } from './containers/examen-medico/modal/cancel-exam/cancel-exam.component';
import { ChangeStatusPostulantComponent } from './containers/postulaciones/modal/change-status-postulant/change-status-postulant.component';
import { CancelProcessPostulantComponent } from './containers/postulaciones/modal/cancel-process-postulant/cancel-process-postulant.component';
import { UploadResultsExamenComponent } from './containers/examen-medico/modal/upload-results-examen/upload-results-examen.component';
import { ExamenFiltersComponent } from './components/examen-filters/examen-filters.component';


const routes: Routes = [
    {
        path: '',
        component: AdmisionComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'postulaciones',
            },
            {
                path: 'ver-informacion',
                component: ViewInformationComponent,
            },
            {
                path: 'historial',
                component: HistoryPostulantComponent,
            },
            {
                path: 'ficha',
                component: FichaPostulantComponent,
            },
            {
                path: 'postulaciones',
                component: PostulacionesComponent,
            },
            {
                path: 'ofertas',
                component: OfertasComponent,
            },
            {
                path: 'entrevistas',
                component: EntrevistasComponent,
            },
            {
                path: 'examen-medico',
                component: ExamenMedicoComponent,
            },
            {
                path: 'evaluaciones',
                component: EvaluacionesComponent,
            },
            {
                path: 'configuracion',
                component: ConfiguracionComponent,
            },
        ]
    }
];

@NgModule({
    declarations: [
        AdmisionComponent,
        PostulacionesComponent,
        OfertasComponent,
        EntrevistasComponent,
        ExamenMedicoComponent,
        EvaluacionesComponent,
        ConfiguracionComponent,
        OfferFiltersComponent,
        OfferActionsComponent,
        CreateOfferComponent,
        ChangeStatusComponent,
        PostulantFiltersComponent,
        EditOfferComponent,
        ViewInformationComponent,
        HistoryPostulantComponent,
        FichaPostulantComponent,
        CreateInterviewComponent,
        InterviewActionsComponent,
        ScheduleInterviewComponent,
        Modal1InterviewComponent,
        Modal2InterviewComponent,
        Modal3InterviewComponent,
        EditInterviewComponent,
        CancelInterviewComponent,
        Modal1CreateInterviewComponent,
        EvaluationActionsComponent,
        ManageEvaluationComponent,
        Modal1ManageEvaluationComponent,
        Modal2ManageEvaluationComponent,
        Modal3ManageEvaluationComponent,
        LoadResultsEvaluationComponent,
        GestionarExamenComponent,
        SendEmailComponent,
        AssignResponsibleComponent,
        ReprogramComponent,
        CancelExamComponent,
        ChangeStatusPostulantComponent,
        CancelProcessPostulantComponent,
        UploadResultsExamenComponent,
        ExamenFiltersComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatCardModule,
        MatTooltipModule,
        MatMenuModule,
        MatDialogModule,
        MatSidenavModule,
        SharedModule,
    ],
    entryComponents: [
        CreateOfferComponent,
        ChangeStatusComponent,
        EditOfferComponent,
        CreatePostulantComponent,
        ViewInformationComponent,
        HistoryPostulantComponent,
        CreateInterviewComponent,
        ScheduleInterviewComponent,
        Modal1InterviewComponent,
        Modal2InterviewComponent,
        Modal3InterviewComponent,
        EditInterviewComponent,
        Modal1CreateInterviewComponent,
        Modal1ManageEvaluationComponent,
        Modal2ManageEvaluationComponent,
        Modal3ManageEvaluationComponent,
        LoadResultsEvaluationComponent
    ]
})
export class AdmisionModule {
}
