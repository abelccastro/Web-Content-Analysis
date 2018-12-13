import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../core/nga.module';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { Login } from './login.component';
import { routing }       from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    Ng2DeviceDetectorModule.forRoot(),
    routing,
  ],
  declarations: [
    Login,
  ]
})
export class LoginModule {}
