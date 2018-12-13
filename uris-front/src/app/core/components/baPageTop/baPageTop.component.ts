import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalState} from '../../../global.state';

import 'style-loader!./baPageTop.scss';

import { Util, Usuario} from '../../index';
import { AppConfig } from '../../../app.config';
import { PagesConfig } from '../../../pages/pages.config';
import { BaProfile } from '../baProfile/baProfile.component';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public displayName:string = "Usuario sin acceso";
  public isValid:boolean = false;
  public user: Usuario;
  public listaApp:any;
  public clsLenApp: boolean = true;
  @ViewChild(BaProfile) private profileModal: BaProfile;

  constructor(private _state:GlobalState, private _util: Util, private _router: Router) {
    this.isValid = false;
    this.user = new Usuario();
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    if(!AppConfig.MODODEV)
    {
      if(this._util.validToken(false))
        this.coreUserSer();
    }
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public coreUserSer() {
    let user = new Usuario();
    user.uid = this._util.coreUserDetails();
    let url = "rs/ser/v1/sesiones/adm/consultarUsuario";
		this._util.http({url: url, app: PagesConfig.APP})
    .subscribe(
        data => {
          this.isValid = true;
          this.user = data;
          this.displayName = "Bienvenido,  "+this.user.displayName;
          if(this.user.aplicaciones.length <= 1)
            this.clsLenApp = false;
          else
            this.clsLenApp = true;
          if(this.user.aplicaciones.length > 0) {
            this._util.apps = this.user.aplicaciones;
            this._util.setRolesUser(this.user.aplicaciones);
          }
        },
        error => {
          this.isValid = false;
          this.displayName = "Usuario sin acceso";
          this.login();
        });
  }
  
  public cerrar() {
    this._util.cerrarSesion();
  }

  public inicio() {
    this._util.goToHome();
  }
  public login() {
    this._util.cerrarSesion();
  }

  public gotoDashboard() {
    this._util.getUrl({app:'main'}).subscribe(data=>{ window.open(data); });
  }

  public goToApp(url:string) {
    window.open(url);
  }
  private showProfile(): void{
    //window.open('#/profile');
    this.profileModal.showModal();
  }
}
