import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsAqmRoutingModule } from './lims-aqm-routing.module';
import { AqmModuleAdminComponent } from '../aqm-module-admin/aqm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    AqmModuleAdminComponent,




  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsAqmRoutingModule
  ]
})
export class LimsAqmModule { }
