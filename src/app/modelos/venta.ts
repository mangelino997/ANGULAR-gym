import { FormGroup, FormControl, Validators } from '@angular/forms';
//Define la entidad de la base de datos.
export class Venta {
    //define un formulario FormGroup
    public formulario: FormGroup;
    // define un formulario de Consumos
    public formularioConsumo: FormGroup;
    //constructor
    constructor() {
        // crear el formulario para la seccion de modulos
        this.formulario = new FormGroup({
            id: new FormControl(),
            fecha: new FormControl(),
            socio: new FormControl('', Validators.required),
            usuarioAlta: new FormControl(),
            importeAbona: new FormControl(),
            importeTotal: new FormControl(),
            consumos: new FormControl()
        });
        this.formularioConsumo = new FormGroup({
            importe: new FormControl(),
            cantidad: new FormControl(),
            concepto: new FormControl(),
            anio: new FormControl(),
            socio: new FormControl(),
            usuarioAlta: new FormControl()
          });

    }
}
