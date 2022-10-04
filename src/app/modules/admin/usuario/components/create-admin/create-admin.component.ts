import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, UntypedFormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonService } from 'app/shared/services/common.service';

@Component({
    selector: 'app-create-admin',
    templateUrl: './create-admin.component.html',
    styleUrls: ['./create-admin.component.scss'],
    animations: fuseAnimations
})
export class CreateAdminComponent implements OnInit {

    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    formActions: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _fb: UntypedFormBuilder,
        private _authService: AuthService,
        private _commonService: CommonService
    ) {
        this.createFormActions();
    }

    ngOnInit(): void {
    }

    createFormActions(): void {
        this.formActions = this._fb.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            nombreUsuario: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            foto: ['foto.jpg'],
            roles: [
                ['admin'],
            ],
        });
    }

    addAdmin(): void {
        if (this.formActions.invalid) {
            return;
        }

        // Disable the form
        this.formActions.disable();

        // Hide the alert
        this.showAlert = false;

        //FormData
        const form = this.formActions.value;
        const foto = new Blob([form?.foto], { type: 'multipart/form-data' });

        const formData = new FormData();
        formData.append('apellidos', form?.apellidos);
        formData.append('email', form?.email);
        formData.append('foto', foto);
        formData.append('fotografia', 'sinFoto');
        formData.append('nombre', form?.nombre);
        formData.append('nombreUsuario', form?.nombreUsuario);
        formData.append('password', form?.password);
        formData.append('roles', form?.roles);

        console.log(form);

        this._authService.signUpAdmin(formData)
            .subscribe(
                (response) => {
                    // Re-enable the form
                    this.formActions.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    this.showAlert = false;

                    if (response.mensaje == 'Usuario registrado correctamente') {
                        // Alert
                        this.alert = {
                            type: 'success',
                            message: response.mensaje
                        };
                        this.showAlert = true;
                    } else {
                        // Alert
                        this.alert = {
                            type: 'error',
                            message: response.mensaje
                        };

                        // Show the alert
                        this.showAlert = true;
                    }

                });

        this._commonService.addEncargado(form).subscribe((response) => {
            console.log(response);
        });

    }

}
