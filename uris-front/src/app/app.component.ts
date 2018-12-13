import { Component, ViewContainerRef } from '@angular/core';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './core/services';
import { BaThemeConfig } from './core/core.config';
import { layoutPaths } from './core/core.constants';

import 'style-loader!./app.scss';
import 'style-loader!./core/initial.scss';
import { Util } from './core/util/util';
import { AppConfig } from './app.config';
import { PagesConfig } from './pages/pages.config';

/**
 * App Component, el nivel mas alto del sistema
 * @author: MK
 */
@Component({
  selector: 'app',
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private _util: Util) {

    _util.readFileRoutes().subscribe(data =>{
        AppConfig.IP_ROUTE = data.IP_ROUTE_SGR;
        PagesConfig.IP_ROUTE = data.IP_ROUTE_APP;
        AppConfig.TIMER_LOADER = data.TIMER_LOADER;
      });
    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit(): void {
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

}
