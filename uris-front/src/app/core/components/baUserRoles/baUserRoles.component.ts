import { PagesConfig } from '../../../pages/pages.config';
import { Component,OnInit,Input } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Util, Usuario} from '../../index';
import { AppConfig } from '../../../app.config';

import { BaMenuService } from '../../index';
import { Children } from '../../entidades/children';
import { Data } from '../../entidades/data';
import { Menu } from '../../entidades/menu';
@Component({
    selector: 'ba-user-roles',
    templateUrl: './baUserRoles.html',
    styleUrls: ['./baUserRoles.scss']
})
export class BaUserRoles implements OnInit{
	@Input() sidebarCollapsed: boolean = false;
	
    private rolesUser: Array<string> =  new Array<string>();;
    private rutas: Array<any> = new Array<any>();
    private izqIni: number = 24;
    private rolStr: string;

    constructor(private _util: Util,private _menuService: BaMenuService){
        
    }
    ngOnInit(){
        if(!AppConfig.MODODEV){
            if(this._util.validToken(false))
                this.listarRoles();
        }
    }
    private listarRoles(){
        let url = "rs/ser/v1/sesiones/adm/listarRoles";
		this._util.http({url: url, app: PagesConfig.APP}).subscribe(
            data => {
                this.rolesUser = data;
                if(this.rolesUser && this.rolesUser.length > 0){
                    this.rolStr = this.rolesUser[0];
                    if(this._util.coreUserDetails().rol){
                        this.rolStr = this._util.coreUserDetails().rol
                    }
                    this.consultarMenu(this.rolStr);
                }
            }
        );
    }
    private consultarMenu(rol: string){
        this.rolStr = rol;
        this._util.setRolUser(rol);
        let url = "rs/ser/v1/sesiones/adm/consultarMenu";
		this._util.http({url: url, data: {rol:rol}}).subscribe(
            (data: Array<any>)=>{
                this.generarMenu(data);
                this._util.hideLoader();
            },error => {
                this._util.cerrarSesion();
                this._util.hideLoader();
            }
        );
    }
    private generarMenu(data: Array<any>){
        let myMenu: Array<Routes> = new Array<Routes>();
        let menu : Array<Children> = new Array<Children>();
        for(let index in data){
            let ord = 1;
            let child: Children;
            child = this.crearChildren(this.izqIni, data[index]);
            child.data.menu.selected = false;
            child.data.menu.expanded = false;
            child.data.menu.order = 400;
            child.data.menu.izqpadding = ord+"px";
            menu.push(child);        
            menu[index].children = []; 
            this.izqIni = this.izqIni + 10;
            this.recursivo(ord, data[index], menu[index]);

            myMenu.push(JSON.parse(JSON.stringify(child)));

        }
        this.getSessionMenu();
        this._menuService.updateMenuByRoutes(<Routes>menu);
    }
    private getSessionMenu() {
        this.rutas.forEach(e => {
            let paths : string[] = e.split('/');
            if(paths.length > 1) {
                this._util.removeItem(this.rutas, e);
                for (var index = 0; index < paths.length; index++) {
                this.rutas.push(paths[index]);
                }
            }
        });
        this._util.setMenus(this.rutas);
    }

    private crearChildren(ord:number, datos) {
        let child = new Children();
        child.data = new Data();
        child.data.menu = new Menu();
        child.path = datos.ruta;
        this.rutas.push(datos.ruta);
        child.data.menu.title = datos.nombre;
        child.data.menu.icon = datos.icono;
        child = this.shortTittle(child, datos.nombre);
        return child;
    }
  
    private recursivo(ord:number, datos, menu) {
        ord = ord + 3;
        for(var value in datos.menuHijos){
        let child = this.crearChildren(ord, datos.menuHijos[value]);
        child.data.menu.izqpadding = ord+"px";
        child.children = [];
        menu.children.push(child);

        if( datos.menuHijos[value].menuHijos.length > 0 ){
            this.recursivo(ord, datos.menuHijos[value], menu.children[value]);
        }
        }
    }
    private shortTittle(chi:Children, nom:string):Children {
        chi.data.menu.short = nom;
        let words = nom.split(/\s+/);
        let wordsjoin = [];
        let fl = 0;
        words.forEach(e => {
        let fl2 = e.length + fl;
        if(fl2 > 17) {
            chi.data.menu.short = wordsjoin.join(" ");
            return chi;
        }
        else {
            fl += e.length;
            wordsjoin.push(e);
        }
        });
        return chi;
    }
}