import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Venta {
    //define un formulario FormGroup
    public formulario: FormGroup;
    
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            version: new FormControl(),
            idConcepto: new FormControl(),
            fecha: new FormControl(),
            mes: new FormControl([Validators.required, Validators.maxLength(10)]),
            anio: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            importe: new FormControl('', Validators.required),
            saldo: new FormControl('', Validators.required),
            estaActivo: new FormControl('', Validators.required),
            idSocio: new FormControl('', Validators.required),
            idUsuarioAlta: new FormControl('', Validators.required),
            idUsuarioMod: new FormControl()
        })
    }
}
