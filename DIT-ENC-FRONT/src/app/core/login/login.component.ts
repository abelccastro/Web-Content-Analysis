import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '../util/util';
import { Usuario } from '../entidades/usuario';
import { Controller } from '../super/controller';
import { AppConfig } from '../../app.config';
import { PagesConfig } from '../../pages/pages.config';
import 'style-loader!./login.scss';
import { BaUtilString } from "../util/baUtil/index";
import * as _ from "lodash";
import { Ng2DeviceService } from 'ng2-device-detector';
import { browsersVersion } from "../core.constants";

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login extends Controller implements OnInit{
  public form: FormGroup;
  public usuario: AbstractControl;
  public password: AbstractControl;
  public url1: AbstractControl;
  public url2: AbstractControl;

  public submitted: boolean = false;
  public nombreapp: string = PagesConfig.NAME_APP;

  private dataUrl: any;
  private regexrUrl: string = '^(http[s]?:\/\/)(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):)(([1-9][0-9]){2})$';
  private olderSgrPath: string;
  private olderAppPath: string;
  private mensaje_login:string = "";
private messaje_version:string = "Está usando una versión antigua de su navegador, actualice a la última versión de Google Chrome para el uso correcto de la aplicación.";
  private showMessageBrowserVersion: boolean = false;
  
  constructor(private fb: FormBuilder, private _router: Router, private _arouter: ActivatedRoute, private _util: Util, private _utiStr: BaUtilString,private deviceService: Ng2DeviceService) {
    super();
    this.olderSgrPath = _.cloneDeep(AppConfig.IP_ROUTE);
    this.olderAppPath = _.cloneDeep(PagesConfig.IP_ROUTE);
    this.checkBrowserVersion();
  }
  private checkBrowserVersion(){
    let deviceInfo = this.deviceService.getDeviceInfo();
    let browserName:string = deviceInfo.browser;
    let browserVersion:string = deviceInfo.browser_version;

    let numVersion = Number(browserVersion.substring(0,browserVersion.indexOf('.')));
    this.showMessageBrowserVersion = browserName == 'chrome' ?  numVersion < browsersVersion.CHROME : browserName == 'firefox' ? numVersion < browsersVersion.FIREFOX : false;
  }
  ngOnInit():void {    
    this._arouter.data.subscribe(data => {
      this.dataUrl = data;
      AppConfig.LOGIN_PATH = this.dataUrl.path;
      if(this.dataUrl.withRoutes){
        this.form = this.fb.group({
          'usuario': ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          'url1': ['', Validators.compose([Validators.required, Validators.pattern(this.regexrUrl)])],
          'url2': ['', Validators.compose([Validators.required,Validators.pattern(this.regexrUrl)])]
        });
        this.usuario = this.form.controls['usuario'];
        this.password = this.form.controls['password'];
        this.url1 = this.form.controls['url1'];
        this.url2 = this.form.controls['url2'];
      }else {
        this.form = this.fb.group({
          'usuario': ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
        this.usuario = this.form.controls['usuario'];
        this.password = this.form.controls['password'];
      }
      this._util.validToken(true);
    });
    
  }

  public onSubmit(values: Object): void {
    
    this.submitted = true;
    if (this.form.valid) {
      if(this.dataUrl.withRoutes){
        let arraysplit: string[] = AppConfig.IP_ROUTE.split('/');
        AppConfig.IP_ROUTE = this._utiStr.concatenate(this.url1.value,'/',arraysplit[arraysplit.length - 2],'/');
        arraysplit = PagesConfig.IP_ROUTE.split('/');
        PagesConfig.IP_ROUTE = this._utiStr.concatenate(this.url2.value,'/',arraysplit[arraysplit.length - 2],'/');
      }
      var _usu = new Usuario();
      _usu.uid = this.usuario.value;
      _usu.userPassword = this.password.value;
      if(AppConfig.MODODEV) {
            this._router.navigateByUrl(PagesConfig.PAGEINICIO);
      }
      else {
        this._util.showLoader();
        this._util.coreToken(_usu)
          .subscribe(
          data => {            
            if(data.length > 0)
            {
              if(this.dataUrl.withRoutes) {
                this._util.coreTokenAccesoPublico(data, _usu.uid);
                this._router.navigateByUrl(PagesConfig.PAGEINICIO);
              }else {
                this._util.coreTokenAcceso(data, _usu.uid);
                this._router.navigateByUrl(PagesConfig.PAGEINICIO);
              }
              
            }
            else {
              this._util.hideLoader();
              this.mensaje_login = "Sus credenciales son incorrectas. Inténtalo de nuevo.";
            }
            
          },
          error => {
            this._util.hideLoader();
            AppConfig.IP_ROUTE = _.cloneDeep(this.olderSgrPath);
            PagesConfig.IP_ROUTE = _.cloneDeep(this.olderAppPath);
            this.mensaje_login = "Sus credenciales son incorrectas. Inténtalo de nuevo.";
            this._router.navigateByUrl(AppConfig.LOGIN_PATH);
          }
        );
      }
    }
  }
}
