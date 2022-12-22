import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdmisionService } from '../../admision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Postulante } from '../../admision.interface';
import { BehaviorSubject, merge, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageProviderService } from '../../../../../shared/services/message-provider.service';
import { FormUtils } from '../../../../../shared/utils/form.utils';
import { PostulacionesService } from './postulaciones.service';
import { CreatePostulantComponent } from '../../components/create-postulant/create-postulant.component';
import moment from 'moment';
import { SendEmailComponent } from './modal/send-email/send-email.component';
import { AssignResponsibleComponent } from './modal/assign-responsible/assign-responsible.component';
import { ChangeStatusPostulantComponent } from './modal/change-status-postulant/change-status-postulant.component';
import { CancelProcessPostulantComponent } from './modal/cancel-process-postulant/cancel-process-postulant.component';
import { ViewInformationComponent } from '../../components/view-information/view-information.component';

@Component({
    selector: 'app-postulaciones',
    templateUrl: './postulaciones.component.html',
    styleUrls: ['./postulaciones.component.scss']
})

export class PostulacionesComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    dataSource: Postulante[] = [];
    displayedColumns: string[] = ['imagen', 'informacion', 'estado', 'responsable', 'actions'];

    count;

    changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _ngxSpinner: NgxSpinnerService,
        private _messageProviderService: MessageProviderService,
        private _postulacionService: PostulacionesService,
        private _admisionService: AdmisionService,
        private cd:ChangeDetectorRef
    ) {
        this._admisionService.title.next('Postulaciones');
    }

    ngOnInit(): void {
        this._postulacionService.eventCreate.pipe(takeUntil(this.unsubscribe))
            .subscribe(_ => this.createOrEditPostulant());
    }

    ngAfterViewInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Items por página.';
        this.initPagination();
        this.cd.detectChanges();
    }

    initPagination(): void {
        merge(this.paginator.page, this.changesSubject, this._postulacionService.eventFilters)
            .pipe(
                switchMap(() => {
                    this._ngxSpinner.show();
                    const rawValue = this._postulacionService.eventFilters.value;
                    const filters = rawValue ? FormUtils.deleteKeysNullInObject(rawValue) : null;
                    const queryParamsByPaginator = { ...filters } as any;
                    queryParamsByPaginator.limit = this.paginator.pageSize;
                    queryParamsByPaginator.offset = queryParamsByPaginator.limit * this.paginator.pageIndex;
                    return this._postulacionService.getPostulantes(queryParamsByPaginator);
                })
            ).subscribe((response) => {
                this._ngxSpinner.hide();
                this.count = response?.numberOfElements;
                this.dataSource = response?.content;

                //const cv = 0;

                /*this.dataSource.forEach(element => {
                    //element.urlCurriculumVitae = "con DATOS";

                    const params = {
                        postulanteId: Number(element?.id)
                    }

                    //this.getCV(params)
                    //this.getPhoto(params);

                    //console.log(params)

                });*/

                //console.log(this.dataSource);

            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    createOrEditPostulant(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(CreatePostulantComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    sendEmail(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(SendEmailComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    assignResponsible(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(AssignResponsibleComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    changeSubStatus(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(ChangeStatusPostulantComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    cancelProcess(element?): void {
        const dialogData = {
            data: { meta: element },
            width: '50vw',
            disableClose: true
        };

        this._messageProviderService.showModal(CancelProcessPostulantComponent, dialogData)
            .afterClosed().subscribe(_ => {
                this.changesSubject.next(true);
            });
    }

    obtenerCV(): void {
        //console.log(this.dataSource?.[0]?.id);
        this.dataSource.forEach(element => {
            console.log(element.id)
        });
    }

    async getCV(payload): Promise<void> {
        try {
            const mensaje = await this._postulacionService.getCV(payload).toPromise();
            console.log(mensaje);
            //this._snackService.open('Correo ENVIADO correctamente', 'Cerrar', { duration: 2000 });
            //this.formActions.reset();
            //this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await 'error';
        }
    }

    async getPhoto(payload): Promise<void> {
        try {
            const mensaje = await this._postulacionService.getPhoto(payload).toPromise();
            console.log(mensaje);
            //this._snackService.open('Correo ENVIADO correctamente', 'Cerrar', { duration: 2000 });
            //this.formActions.reset();
            //this.dialogRef.close();
        } catch (err) {
            throw new Error(err);
        } finally {
            await 'error';
        }
    }

    viewInformation(): void {
        console.log(ViewInformationComponent, '11');
    }

}
