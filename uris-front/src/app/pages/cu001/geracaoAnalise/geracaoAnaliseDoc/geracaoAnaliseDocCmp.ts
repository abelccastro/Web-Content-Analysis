import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util} from '../../../../app.index';
import {BaUtilDate} from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewChild } from '@angular/core/src/metadata/di';
import { UtilConstRutas,UtilConstParam } from '../_constantes/index';
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import { BaConfirmDialogCmp,OPTIONS_MODAL } from "../.././../../core/components/index";

@Component({
	selector: 'geracaoAnaliseDocCmp',
	templateUrl: './geracaoAnaliseDoc.html'
})

export class GeracaoAnaliseDocCmp{
	
	private titulo:string = "Generate Analysis";
}
