import { Injectable, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, URLSearchParams, Request, RequestOptions, RequestMethod } from '@angular/http';
import { ServerParamHttp } from '../conf/serverParamHttp';
import { FilesParamUploader } from '../conf/filesParamUploader';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject } from 'rxjs/Subject';
import { Alerta, Usuario } from '../index';
import { AppConfig } from '../../app.config';
import { PagesConfig } from '../../pages/pages.config';
import { BaThemeSpinner } from '../services';
import { Controller } from '../super/controller';
import { saveAs as importedSaveAs } from "file-saver";
import { CONST_ESTADOS_HTTP } from '../const/const.comun';
/**
 * @author:MK
 */
@Injectable()
export class Util extends Controller {
    constructor(private _http:Http, private _router: Router, private _load: BaThemeSpinner ) {
        super();
    }
    public apps: any;
    /**
	 * Funcion que retorna la url del sistema
	 */
    protected confUrl: ServerParamHttp;
    public getUrl(confUrl: ServerParamHttp|{} = {})
    {
        this.confUrl = new ServerParamHttp(this._http, confUrl);
        return this.confUrl.validRootApp();
    }

    /**
	 * Funciones para las llamadas GET sin datos
	 */
    protected conf: ServerParamHttp;
    public http(conf: ServerParamHttp|{} = {}) 
    {
        //this._spinner.showIn();
        this.conf = new ServerParamHttp(this._http, conf);
        return this.conf.http()
            .map(res => {
                return this.extractData(res, this.conf.tipo);
            })
            .catch(this.handleError);
    }

    /**
	 * Funciones Transformadores de respuestas REST
	 */
    private extractData(res: Response, tipo: string) {
        if(res.status == 401)
        {
            console.log("(MK)HandleError222222222");
        }
        if (res.text().length > 0) {
            let body;
            body = this.getTipoData(res, tipo);
            return body || { };
        }
        else return {};
    }

    private getTipoData(res, tipo) {
        let rpta: any;
        switch (tipo) {
            case 'BLOB':
                rpta = res.blob();
                break;
            case 'JSON':
                rpta = res.json();
                break;
            default:
                rpta = res.text();
                break;
        }
        return rpta;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        let err: string;
        console.log("(MK)HandleError");
        if(error.status == CONST_ESTADOS_HTTP.UNAUTHORIZED) { 
            return Observable.throw(new Alerta({"estado": CONST_ESTADOS_HTTP.UNAUTHORIZED}));
        }
        else {
            if (error instanceof Response) {
            const body = error.json() || '';
            err = body.error || JSON.stringify(body);
            errMsg = `Estado: ${error.status}, Descripción: ${error.statusText || ''} , Error: ${err}`;
            } else {
            errMsg = error.message ? error.message : error.toString();
            }
            return Observable.throw(JSON.parse(error._body));
        }

    }

    public clone(object: any){
        return JSON.parse(JSON.stringify(object));
    }

    /**
	 * Funciones para manejar los Token's y Sesiones
	 */
    private varToken = 'app-token';
    private varUsuar = 'app-usuario-' + PagesConfig.APP ;
    private varUsuarNom = 'app-usuario-';
    private varMenus = 'app-menus-';
    private varUrlApp = 'app-url-' + PagesConfig.APP;

    public coreToken(_data) 
    {
        let _url = 'rs/ser/sgr/v1/sesiones/adm/generarToken';
        return this.http({url:_url, data:_data, app:"sgr", tipo:true}).catch(this.handleError);
    }
    public coreTokenAcceso(data:any, usuario:any) {
        this.cleanSesiones();
        localStorage.setItem(this.varToken, JSON.stringify(data));
		let user = {uuid:usuario}
        localStorage.setItem(this.varUsuar, JSON.stringify(user));  
        this.setSessionContext();      
    }
    public coreTokenAccesoPublico(data:any, usuario:any) {
        this.cleanSesiones();
        localStorage.setItem(this.varToken, JSON.stringify(data));
		let user = {uuid:usuario}
        localStorage.setItem(this.varUsuar, JSON.stringify(user));  
        this.setSessionContextPublico();      
    }
    public readFileRoutes(): Observable<any> {
        return this._http.get('./assets/app/rutas.json')
            .map(res => res.json());
    }
	public setRolUser(rol: string){
        let user = JSON.parse(localStorage.getItem(this.varUsuar));
        if(user){
            user['rol'] = rol;
            localStorage.setItem(this.varUsuar, JSON.stringify(user));  
        }
    }
    public setRolesUser(app: any){
        app.forEach(e => {
            let user = JSON.parse(localStorage.getItem(this.varUsuar));
            if(user){
                user['rol'] = e.roles[0];
                localStorage.setItem(this.varUsuarNom+e.nombre, JSON.stringify(user));  
            }
        });
    }
    private setSessionContext() {
        this.getUrl({root:true})
            .subscribe(data => {
                localStorage.setItem(this.varUrlApp, JSON.stringify(this.confUrl.url));
            },
            err => {
                this.hideLoader();
                this.cleanSesiones();
                this.goToLogin();
            },()=>{});
    }
    private setSessionContextPublico() {
        localStorage.setItem(this.varUrlApp, JSON.stringify(PagesConfig.IP_ROUTE));
    }
    public coreGetToken()
    {
        return JSON.parse(localStorage.getItem(this.varToken));
    }
    public validToken(val:any)
    {
        let tok = this.coreGetToken();
        if (tok !== null) {
            if(val)
                this.goToHome();
            else
                return true;
        } else {
            this.goToLogin();
        }
    }
    public cleanSesiones()
    {
        localStorage.removeItem(this.varToken);
        localStorage.removeItem(this.varUsuar);
        localStorage.removeItem(this.varUrlApp);
        if(this.apps){if(this.apps.length > 0){
            this.apps.forEach(e => {
                localStorage.removeItem(this.varUsuarNom+e.nombre); 
                localStorage.removeItem(this.varMenus+e.nombre); 
            });
        }}
    }

    public coreUserDetails() {
        return JSON.parse(localStorage.getItem(this.varUsuar));
    }

    public cerrarSesion() {
        this.cleanSesiones();
        this._router.navigateByUrl("login");
        if(this._router.isActive('login', true) || this._router.isActive('/', true))
        {
            location.reload();
        }
    }

    public goToHome() {
        this._router.navigateByUrl(PagesConfig.PAGEINICIO);
    }

    public goToLogin() {
        this.cleanSesiones();
        this._router.navigateByUrl(AppConfig.LOGIN_PATH);
    }

    public goToPage(page:string) {
        this._router.navigateByUrl(page);
    }

    /**
	 * Función para manejar las alertas/notificaciones
	 */
    private alertas = new Subject<Alerta>();
    alertas$ = this.alertas.asObservable();
    public alerts(a: any) {
        if(a.hasOwnProperty("mensaje")) {
            let ale = new Alerta(a);
            this.alertas.next(ale);
        }
    }

    /**
	 * Funciones para la Conexión del las llamadas REST
	 */

    private paramMostrar = new Subject<any>();
    paramMostrar$ = this.paramMostrar.asObservable();
    public setParamMostrar(paramMostrar: any) {
        this.log("util-paramsMO:" + paramMostrar);
        this.paramMostrar.next(paramMostrar);
    }

    private paramGenerar = new Subject<any>();
    paramGenerar$ = this.paramGenerar.asObservable();
    public setParamGenerar(paramGenerar: any) {
        this.log("util-paramsGE:" + paramGenerar);
        this.paramGenerar.next(paramGenerar);
    }

    private paramActualizar = new Subject<any>();
    paramActualizar$ = this.paramActualizar.asObservable();
    public setParamActualizar(paramActualizar: any) {
        this.log("util-paramsAC:" + paramActualizar);
        this.paramActualizar.next(paramActualizar);
    }

    private paramAnular = new Subject<any>();
    paramAnular$ = this.paramAnular.asObservable();
    public setParamAnular(paramAnular: any) {
        this.log("util-paramsAN:" + paramAnular);
        this.paramAnular.next(paramAnular);
    }

    private paramAsignar = new Subject<any>();
    paramAsignar$ = this.paramAsignar.asObservable();
    public setParamAsignar(paramAsignar: any) {
        this.paramAsignar.next(paramAsignar);
    }
    
    /**
	 * Funcion que valida las rutas del menu
	 */
    public setMenus(rutas:any) {
        localStorage.setItem(this.varMenus+PagesConfig.APP, JSON.stringify(rutas));
    }
    public routerLink() {
        if(!AppConfig.MODODEV) {
            let tempmenus = JSON.parse(localStorage.getItem(this.varMenus+PagesConfig.APP));
            let urlActive = this._router.url.substring(1).split("/");
            this.validRouter(tempmenus, urlActive);
        }
    }
    public routerLinkParam(s:string) {
        let tempmenus = JSON.parse(localStorage.getItem(this.varMenus+PagesConfig.APP));
        let urlActive = s.substring(1).split("/");
        this.validRouter(tempmenus, urlActive);
    }

    public validRouter(tempmenus, urlActive) {
        //this.log(tempmenus);
        //this.log(urlActive);
        let fl = false;
        urlActive.forEach(e => {
            let a = tempmenus.indexOf(e);
            if(a < 0) {
                fl = true;
            }
        });
        if(fl) {
            this.goToHome();
            this.alerts({"mensaje":"Ruta no autorizada", "tipo":"cuidado"});
        }
    }

    /**
	 * Extras
	 */
    public removeItem(data:any, item: any) {
        let index: number = data.indexOf(item);
        if (index !== -1) {
            data.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }

    /**
	 * Mostrar y ocultar el Loader
	 */
    public showLoader() 
    {
        this._load.showIn();
    }

    public hideLoader(delay:number = 0) 
    {
        this._load.hide(delay);
    }

    private log(cad:any)
    {
        if(AppConfig.MODODEV) {
            console.log(cad);
        }
    }

    /**
     * Metodo que valida un formulario
     */
    public onValueChanged(temp?:any , formulario?:any, data?:any) {
        if (!formulario) {
			return;
		}
		const form = formulario;
        temp.forEach(control => {
            let name = Object.keys(control).toString();
        });
		for (const field in temp.validControls) {
			temp.validControls[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = temp._controls.msg[field];
				for (const key in control.errors) {
					temp.validControls[field] += messages[key] + ' ';
				}
			}
		}
    }
    /**
     * Metodo que permite descargar un archivo
     */
    protected paramsFiles: FilesParamUploader;
    public downloadFiles(paramsFiles: FilesParamUploader|{} = {}) {
        this.paramsFiles = new FilesParamUploader(paramsFiles);
        switch (this.paramsFiles.tipo.toUpperCase()) {
            case 'PDF':
                var myBlob = new Blob([this.paramsFiles.data], { type: 'application/pdf' });
		        importedSaveAs(myBlob, this.paramsFiles.nombre);
                break;
            case 'EXCEL':
                var myBlob = new Blob([this.paramsFiles.data], { type: 'application/vnd.ms-excel' });
		        importedSaveAs(myBlob, this.paramsFiles.nombre);
                break;
            default:
                this.alerts({tipo:"error_bug", mensaje:"Error en el tipo de archivo."});
                break;
        }
    }
	
	/**
	 * Este metodo extrae el nombre de archivo
	 * @author Luis Miguel Amat
     * @param {string} res
	 * @return {string} nombreArchivo
	 */
	public extraerNombreArchivo(res: any) : string {		
		let nameFile;		
		if(res.headers.has('Content-Disposition')) {
			let headerValue = res.headers.get('Content-Disposition').split("=");
			nameFile = headerValue[1];
		}		
		return nameFile;
	}
	
	/**
	 * Este metodo extrae la extension del nombre de un archivo
	 * @author Luis Miguel Amat
     * @param {string} nombreArchivo
	 * @return {string} extension
	 */
	public extraerExtensionArchivo(nombreArchivo: string) : string {
		let ext;
		if(nombreArchivo !== null) {
			let elementos = nombreArchivo.split('\.');
			ext = elementos[1];
		}
		return ext;
	}
}