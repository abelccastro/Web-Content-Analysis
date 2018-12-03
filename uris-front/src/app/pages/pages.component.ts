import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { BaMenuService } from '../core';
import { PAGES_MENU } from './pages.menu';

import { Http, Response }    from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Children } from '../core/entidades/children';
import { Data } from '../core/entidades/data';
import { Menu } from '../core/entidades/menu';

import { Util } from '../core/index';
import { AppConfig } from '../app.config';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <ba-alerta></ba-alerta>
    <div class="al-main">
      <div class="al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Power By DITUNSA</div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService, private http:Http, private _util: Util, private _router: Router) {
  }
  rutas: any[] = [];
  izqIni: number = 24;
  listMenu: any;
  ngOnInit() {

    let myMenu: Array<Routes>;
    myMenu = [];
    this.rutas = [];

    if(AppConfig.MODODEV) {
      this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }
  }
}