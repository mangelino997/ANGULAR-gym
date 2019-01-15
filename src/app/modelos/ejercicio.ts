import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Ejercicio {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            version: new FormControl(),
            nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            idGrupoGeneral: new FormControl('', Validators.required),
            idGrupoMuscular: new FormControl('', Validators.required),
            idGrupoMaquina: new FormControl('', Validators.required),
            idImagen: new FormControl('', Validators.required),
            lesiones: new FormControl(),
        })
    }
}