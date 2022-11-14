import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Estado } from 'app/shared/interfaces/common.interface';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { PostulacionesService } from '../../containers/postulaciones/postulaciones.service';

@Component({
    selector: 'app-examen-filters',
    templateUrl: './examen-filters.component.html',
    styleUrls: ['./examen-filters.component.scss']
})
export class ExamenFiltersComponent implements OnInit {

    formFilters: FormGroup;
    unsubscribe: Subject<void> = new Subject<void>();
    estados: Estado[] = [
        { id: 1, name: 'PROGRAMADO' },
        { id: 2, name: 'APROBADO' },
        { id: 3, name: 'CANCELADO' },
        { id: 4, name: 'DESAPROBADO' },
        { id: 5, name: 'OBSERVADO' },
        { id: 6, name: 'REPROGRAMADO' },
        { id: 7, name: 'PENDIENTE' },
    ];

    constructor(
        private _fb: UntypedFormBuilder,
        private _postulantServices: PostulacionesService,
    ) {
        this.createFormFilters();
    }

    ngOnInit(): void {
        //this._commonService.getCargo().subscribe(response => (this.cargo = response));
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
            subEstadoExamen: [''],
            fechaInformeMedico: [''],
            fechaProgramada: [''],
        });
    }

}
