import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsVsmRoutingModule } from './lims-vsm-routing.module';
import { VsmModuleAdminComponent } from '../vsm-module-admin/vsm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    VsmModuleAdminComponent,






  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsVsmRoutingModule
  ]
})
export class LimsVsmModule { }
