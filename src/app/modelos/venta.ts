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
            version: new FormControl(),
            idConcepto: new FormControl(),
            fecha: new FormControl(),
            mes: new FormControl('',[Validators.required, Validators.maxLength(10)]),
            anio: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            importe: new FormControl('', Validators.required),
            saldo: new FormControl('', Validators.required),
            estaActivo: new FormControl('', Validators.required),
            socio: new FormControl('', Validators.required),
            idUsuarioAlta: new FormControl('', Validators.required),
            idUsuarioMod: new FormControl(),
            importeAbona: new FormControl(),
            importeTotal: new FormControl(),
            consumos: new FormControl()
        });
        this.formularioConsumo = new FormGroup({
            importe: new FormControl(),
            cantidad: new FormControl(),
            concepto: new FormControl(),
            mes: new FormControl(),
            anio: new FormControl(),
          });

    }
}
