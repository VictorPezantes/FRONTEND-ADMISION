import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    //signUpForm: UntypedFormGroup;
    signUpForm: FormGroup;
    showAlert: boolean = false;

    id: String;
    titulo: String;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const params = this._activatedRoute.snapshot.params;
        if (params.id && params.titulo) {
            this.id = params.id
            this.titulo = params.titulo
            //console.log("Recibiendo parámetros del landing ofertas: " + params.id + " - " + params.titulo)
        }

        // Create the form
        this.signUpForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            nombreUsuario: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            foto: ['foto.jpg'],
            agreements: ['', Validators.requiredTrue]
        }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // FORMDATA
        const form = this.signUpForm.value;
        const foto = new Blob([form?.foto], { type: 'multipart/form-data' });

        const formData = new FormData();
        formData.append('apellidos', form?.apellidos);
        formData.append('email', form?.email);
        formData.append('foto', foto);
        formData.append('fotografia', 'ff');
        formData.append('nombre', form?.nombre);
        formData.append('nombreUsuario', form?.nombreUsuario);
        formData.append('password', form?.password);

        // Sign up
        //this._authService.signUp(this.signUpForm.value)
        this._authService.signUp(formData)
            .subscribe(
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.mensaje
                    };

                    if (response.mensaje == 'Usuario registrado correctamente') {
                        //this._router.navigateByUrl('/iniciar-sesion'); // Navigate to the confirmation required page

                        // Automatic Login
                        const credentials = { email: form.email, password: form.password }
                        // Sign in
                        this._authService.signIn(credentials)
                            .subscribe(
                                () => {
                                    const params = this._activatedRoute.snapshot.params;
                                    if (params.id && params.titulo) {

                                        console.log("Enviando parámetros id y título a registrar-solicitud: " + params.id + " - " + params.titulo)

                                        // const redirectURL = `/solicitud/registrar-solicitud?id=${params.id}&titulo=${params.titulo}`
                                        // this._router.navigateByUrl(redirectURL);

                                        this._router.navigate(['/solicitud/registrar-solicitud', { id: params.id, titulo: params.titulo }]);
                                        // http://localhost:4200/solicitud/registrar-solicitud;id=3;titulo=titulo3
                                    }
                                },
                                (response) => {
                                    console.log("")
                                }
                            );

                    } else {
                        this.showAlert = true; // Show the alert
                    }

                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Error al intentar crear el usuario, comuniquese con el administrador'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

}
