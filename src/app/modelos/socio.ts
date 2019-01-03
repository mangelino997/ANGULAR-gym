import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Socio {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            apellido: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            nombreCompleto: new FormControl('', Validators.maxLength(40)),
            dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
            esVip: new FormControl('', Validators.required),
            fechaPagoAnterior: new FormControl(),
            fechaPagoNuevo: new FormControl(),
            direccion: new FormControl('', Validators.maxLength(60)),
            direccionAlt: new FormControl('', Validators.maxLength(60)),
            codArea: new FormControl('', Validators.maxLength(60)),
            codAreaAlt: new FormControl('', Validators.maxLength(60)),
            telefono: new FormControl('', Validators.maxLength(20)),
            telefonoAlt: new FormControl('', Validators.maxLength(20)),
            nacimiento: new FormControl('', Validators.required),
            cumpleanio: new FormControl('',  Validators.maxLength(4)),
            nombreUsuario: new FormControl('',  Validators.maxLength(20)),
            contrasenia: new FormControl('',  Validators.maxLength(60)),
            idPlanSocio: new FormControl(),
            idPlan: new FormControl(),
            foto: new FormControl(),
            estaActivo: new FormControl(),
            usuarioAlta: new FormControl(),
            idUsuarioBaja: new FormControl(),
            idUsuarioMod: new FormControl(),
            alias: new FormControl('', Validators.maxLength(45))

        })
    }
}