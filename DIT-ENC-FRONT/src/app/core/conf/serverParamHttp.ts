import { Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AppConfig } from '../../app.config';
import { PagesConfig } from '../../pages/pages.config';

export class ServerParamHttp {
  url: string;
  data: string;
  rest: string;
  tipo: string;
  app: string;
  root: boolean;
  file: boolean;
  json: boolean;

  private varUrlApp = 'app-url-'+ PagesConfig.APP;
  private varToken = 'app-token';
  constructor(protected _http: Http, {url = '', data = '', rest = 'POST', tipo = 'JSON', app = '', root = false, json = true, file = false}) {
    this.data = data ? data : '';
    this.rest = rest ? rest : 'POST';
    this.file = file ? file : false;
    this.tipo = tipo ? tipo : 'JSON';
    this.app = app ? app : PagesConfig.APP;
    this.url = url ? url : '';
    this.root = root ? root : false;
    this.json = json;
  }

  getRootContext():Observable<any>{
    let ur = PagesConfig.IP_ROUTE + 'rs/ser/v1/aplicacion/adm/inicio/obtenerRutaContexto';
    let da = {"nombre": this.app};
    let headers = this.getHeaders();
    if(AppConfig.MODODEV) {
        this.log(ur);
        this.log("(MK)Rest-Post: " + JSON.stringify(da));
    }
    return this._http.post(ur, JSON.stringify(da), { headers: headers })
        .map(res => {
            if(this.root)
                this.url = res.text();
            else
                this.url = res.text() + this.url;
            return this.url;
        });
  }

 /**
 * Valida la aplicación
 */
  validRootApp(){
      if(this.app == "sgr")
      {
          this.url = AppConfig.IP_ROUTE + this.url;
          return Observable.of(Response).map(res => this.url);
      }
      else
      {
          if(AppConfig.MODODEV) 
          {
            this.url = PagesConfig.IP_ROUTE + this.url;
            return Observable.of(Response).map(res => this.url);
          }
          else
          {
            if(this.app == PagesConfig.APP) 
            {
                if(this.validSession(this.varUrlApp)) 
                {
                    this.url = this.getSession(this.varUrlApp) + this.url;
                    return Observable.of(Response).map(res => this.url);
                }
                else
                {
                    return this.getRootContext();
                }
            }
            else
            {
                return this.getRootContext();
            }
          }
      }
  }
  http():Observable<any>{
      if(this.app == "sgr")
      {
          this.url = AppConfig.IP_ROUTE + this.url;
          return this.restCall();
      }
      else
      {
          if(AppConfig.MODODEV) 
          {
            this.url = PagesConfig.IP_ROUTE + this.url;
            return this.restCall();
          }
          else
          {
            if(this.validSession(this.varUrlApp)) 
            {
                this.url = this.getSession(this.varUrlApp) + this.url;
                return this.restCall();
            }
            else
            {
                return this.getRootContext()
                .mergeMap(res => this.restCall());
            }
          }
      }
  }

  private getDatos(){
    if(this.json)
        return JSON.stringify(this.data);
    else {
        
        return this.data;
    }
  }
  private restCall() {
      let rpta:Observable<any>;
      this.log(this.url);
      let headers = this.getHeaders();
      let datos = this.getDatos();
      switch (this.rest) {
        case 'GET':
            this.log("(MK)Rest-Get");
            rpta = this._http.get(this.url);
            break;
        case 'DELETE':
            this.log("(MK)Rest-delete: " + datos);
            rpta = this._http.delete(this.url, { headers: headers }); 
            break;
        case 'UPDATE':
            this.log("(MK)Rest-Update: " + datos);
            rpta = this._http.put(this.url, datos, { headers: headers }); 
            break;
        case 'FILE':
            this.log("(MK)Rest-Post-File: " + datos);
            rpta = this._http.post(this.url, datos, new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob })); 
            break;
        default:
            this.log("(MK)Rest-Post: " + datos);
            rpta = this._http.post(this.url, datos, { headers: headers }); 
            break;
      }
    return rpta;
  }

  private getHeaders() {
    let headers = new Headers();
    if(!this.file)
        headers.append('Content-Type', 'application/json');

    if(this.file){
    }

    if(this.getAuthorization().length > 0)
        headers.append('authorization', this.getAuthorization());
    return headers;
  }
  
  private getAuthorization()
  {
    let tok = JSON.parse(localStorage.getItem(this.varToken));
    if(tok != null || tok != undefined)
        return 'Bearer ' + tok;
    else 
        return "";
  }

  private validSession(param:string) {
    let temp = localStorage.getItem(param);
    if (temp === null) {
        return false;
    } else {
        return true;
    }
  }

  private getSession(param:string) {
    return localStorage.getItem(param).replace(/['"]+/g, '').trim();
  }

  private log(cad:any)
  {
      if(AppConfig.MODODEV) {
          console.log(cad);
      }
  }
}