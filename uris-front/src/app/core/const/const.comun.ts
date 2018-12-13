export class CONST_VALID_MSG {
    //public validator:any;
    //public mensaje:any;
    static validFormMessages = {
        'required':'No puedes dejar este campo en blanco.',
        'requiredTrue':'Debe ser un valor verdadero',
        'minlength':'Debes ingresar un minimo de caracteres.',
        'maxlength':'Debes ingresar un maximo de caracteres.',
        'pattern':'Debes ingresar un valor que coincida.',
        'nullValidator':'Validar null.'
    }; 

    static getMensaje(validator:any, mensaje: any, valor:any="") {
        if(typeof mensaje == 'undefined' || mensaje == null) {
            if(typeof valor == 'undefined' || valor == null)
                return this.validFormMessages[validator];
            else {
                return this.validFormMessages[validator].replace("de",valor);
            }
        }
        else
            return mensaje;
    }
}

export class CONST_ESTADOS_HTTP {
    static OK = 200;
    static OKMSG = "Correcto.";

    static UNAUTHORIZED = 401;
    static UNAUTHORIZEDMSG = "Expiró su tiempo de acceso. Por favor vuelva a ingresar al Sistema.";

    static INTERNALFAIL = 500;
    static INTERNALFAILMSG = "Error Interno del Sistema.";
}