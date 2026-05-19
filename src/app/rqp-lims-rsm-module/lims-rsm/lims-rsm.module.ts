import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsRsmRoutingModule } from './lims-rsm-routing.module';
import { RsmModuleAdminComponent } from '../rsm-module-admin/rsm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    RsmModuleAdminComponent,




  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsRsmRoutingModule
  ]
})
export class LimsRsmModule { }
