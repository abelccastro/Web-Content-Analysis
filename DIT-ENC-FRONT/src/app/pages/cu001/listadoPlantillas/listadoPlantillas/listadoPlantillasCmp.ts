import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
	selector: 'listadoPlantillasCmp',
	templateUrl: './listadoPlantillas.html'
})

export class ListadoPlantillasCmp{
	constructor(private _util: Util, private _router: Router) {
	}
}
