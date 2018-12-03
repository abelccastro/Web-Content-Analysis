import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CONST_VALID_MSG } from '../const/const.comun';

export class ValidParamForm {
    private controls: any;
    public  validControls:any = {};
    private validationMessages:any = {};

    constructor(controls:any) {
        this.controls = controls;
    }

    public getFormGroup() {
        this.validControls = {};
        this.validationMessages = {};
        let tempForm = {};
        this.controls.forEach(e => {
            let name = Object.keys(e).toString();
            this.validControls[name] = '';
            let nameForms = {};
            let arr = [];
            e[name].forEach(ee => {
                switch (ee.validator) {
                    case "required":
                        arr.push(Validators.required);
                        break;
                    case "requiredTrue":
                        arr.push(Validators.requiredTrue);
                        break;
                    case "minlength":
                        arr.push(Validators.minLength(ee.valor));
                        break;
                    case "maxlength":
                        arr.push(Validators.maxLength(ee.valor));
                        break;
                    case "pattern":
                        arr.push(Validators.pattern(ee.valor));
                        break;
                    case "nullValidator":
                        arr.push(Validators.nullValidator);
                        break;
                    default:
                        break;
                }
                nameForms[ee.validator] = CONST_VALID_MSG.getMensaje(ee.validator, ee.mensaje, ee.valor);
                
            });
            this.validationMessages[name] = nameForms;
            tempForm[name] = new FormControl('', arr);
        });
        return new FormGroup(tempForm);
    }
    public onValueChanged(formulario?: any) {
		if (!formulario) { return; }
		const form = formulario;
		for (const field in this.validControls) {
			this.validControls[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.validControls[field] += messages[key] + ' ';
				}
			}
		}
	}
}