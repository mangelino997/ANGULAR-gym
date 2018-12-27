import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Concepto {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            alias: new FormControl('', Validators.maxLength(30)),
            importe: new FormControl('', Validators.required),
            idUsuarioAlta: new FormControl('', Validators.required),
            idUsuarioMod: new FormControl('', Validators.required)
        })
    }
}