import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../app.config';
import { PagesConfig } from '../../pages/pages.config';

export class Controller {
    router: Router;
    titulo: string = "MODO-DEV: DIT";
    constructor() {
        if(AppConfig.MODODEV)
            console.log(this.titulo);
    }
}