import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { Util } from '../../../../app.index';
import {ValidParamForm} from '../../../../app.index';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalOptions } from 'ng2-bootstrap';
import { FormGroup } from "@angular/forms";
import { FormControl } from '@angular/forms/src/model';;

@Component({
    selector: 'listadoPreguntasCmp',
    templateUrl: './listadoPreguntas.html'
})
export class ListadoPreguntasCmp implements OnInit{

    ngOnInit(){}
}