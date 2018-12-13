import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';
import { BaConfirmDialogCmp, OPTIONS_MODAL } from '../baConfirmDialog/baConfirmDialogCmp';
import { Util } from '../../util/util';
import { PagesConfig } from '../../../pages/pages.config';
import { AppConfig } from '../../../app.config';

@Component({
    selector: 'ba-profile',
    templateUrl: './baProfile.html',
    styleUrls: ['./baProfile.scss']
})
export class BaProfile implements OnInit{
    private myform: FormGroup;
    private nombreapp: string = PagesConfig.NAME_APP;
    private changePassState: boolean;
    private title: string = 'Perfil de Usuario';
    @ViewChild(BaConfirmDialogCmp) private dialog: BaConfirmDialogCmp;
    @ViewChild(ModalDirective) private modalForm: ModalDirective;
    constructor(private fb: FormBuilder, private _util: Util, private _router: Router){

    }
    public ngOnInit(): void {
        this.myform = this.fb.group({
            'dni': ['', Validators.compose([])],
            'usuario': ['', Validators.compose([])],
            'nombres': ['', Validators.compose([])],
            'apellidos': ['', Validators.compose([])],
            'currentpass': ['', Validators.compose([Validators.required])],
            'newpass': ['', Validators.compose([Validators.required])],
            'confnewpass': ['', Validators.compose([Validators.required])]
        });
        this.myform.controls['dni'].disable();
        this.myform.controls['usuario'].disable();
        this.myform.controls['nombres'].disable();
        this.myform.controls['apellidos'].disable();
        
        this.myform.controls['currentpass'].setValue('');
        this.myform.controls['newpass'].setValue('');
        this.myform.controls['confnewpass'].setValue('');
    }
    public showModal(){
        this.modalForm.show();
        if(!AppConfig.MODODEV){
			if(this._util.validToken(false))
				this.loadUserProfile();
        }
    }
    public closeModal(){
        this.modalForm.hide();
    }
    private loadUserProfile():void {
        this._util.showLoader();
        let url = 'rs/ser/v1/sesiones/adm/consultarPerfil';
        this._util.http({url: url}).subscribe(
            (data: any) => {
                this.myform.controls['dni'].setValue(data.uid);
                this.myform.controls['usuario'].setValue(data.displayName);
                this.myform.controls['nombres'].setValue(data.givenName);
                this.myform.controls['apellidos'].setValue(data.sn);
                this._util.hideLoader();
            },(error: any)=>{
                this._util.hideLoader();
                this._util.alerts({tipo:'danger', mensaje: 'No se pudo obtener los datos del usuario'});
            });
    }
    private onSubmit(formvalue: any){
        this.dialog.openModal({title:"Confirmación",message:"¿Desea Realizar el cambio de contraseña?"}).then(
            data =>{
                if(data === OPTIONS_MODAL.OK){
                    this.changePassword(formvalue);
                    this.dialog.close();
                }
            }
        );

        
    }
    private changePassword(formvalue: any){
        this._util.showLoader();
        let url = 'rs/ser/v1/sesiones/adm/actualizarPerfil';
        let dto: Object = {
            actualPassword: formvalue.currentpass,
            nuevoPassword: formvalue.newpass,
            confirmarPassword: formvalue.confnewpass
        }
        this._util.http({url: url, data: dto}).subscribe(
            data => {
                this._util.hideLoader();
                this._util.alerts({tipo:data.tipo, mensaje: data.mensaje});
                this.closeModal();
                
            },error => {
                this._util.hideLoader();
                this._util.alerts({tipo:'danger', mensaje: error.mensaje});
            }
        );
    }
    
}
class PasswordValidation {
    static MatchPassword(ac: AbstractControl){
        let password = ac.get('newpass').value;
        let confirmPassword = ac.get('confnewpass').value;
        if(password != confirmPassword){
            ac.get('confnewpass').setErrors({MatchPassword: true});
        }else{
            return null;
        }
    }
}