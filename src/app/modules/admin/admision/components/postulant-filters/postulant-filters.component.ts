import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { PostulacionesService } from '../../containers/postulaciones/postulaciones.service';
import moment from 'moment';
import { Cargo, Encargado, EstadoPostulante } from 'app/shared/interfaces/common.interface';
import { CommonService } from 'app/shared/services/common.service';

@Component({
    selector: 'app-postulant-filters',
    templateUrl: './postulant-filters.component.html',
    styleUrls: ['./postulant-filters.component.scss']
})
export class PostulantFiltersComponent implements OnInit {

    formFilters: FormGroup;

    unsubscribe: Subject<void> = new Subject<void>();
    encargado: Encargado[] = [];
    estados: EstadoPostulante[] = [];
    cargo: Cargo[] = [];

    constructor(
        private _fb: UntypedFormBuilder,
        private _postulantServices: PostulacionesService,
        private _commonService: CommonService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        this._postulantServices.getEncargado().subscribe(encargados => { this.encargado = encargados; });
        this._postulantServices.getStatusPostulant().subscribe(response => (this.estados = response));
        this._commonService.getCargo().subscribe(response => (this.cargo = response));
    }

    ngAfterViewInit(): void {
        this.formFilters.valueChanges
            .pipe(takeUntil(this.unsubscribe), debounceTime(500))
            .subscribe(value => {
                const parsedData = this.castToParams(value);
                this._postulantServices.eventFilters.next(parsedData);
            });
    }

    castToParams(filters) {
        return filters;
    }

    createFormFilters(): void {
        this.formFilters = this._fb.group({
            filtro: [''],
            encargadoId: [''],
            estadoPostulanteId: [''],
            cargoId: [''],
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
