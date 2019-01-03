import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Profesor {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
            codigoIngreso: new FormControl('', Validators.maxLength(10))
        })
    }
}