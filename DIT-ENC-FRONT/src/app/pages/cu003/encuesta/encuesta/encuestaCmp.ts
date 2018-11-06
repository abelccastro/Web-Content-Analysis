import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
	selector: 'encuestaCmp',
	templateUrl: './encuesta.html'
})

export class EncuestaCmp{
	constructor(private _util: Util, private _router: Router) {
	}
}

