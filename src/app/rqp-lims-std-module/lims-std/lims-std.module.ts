import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsStdRoutingModule } from './lims-std-routing.module';
import { StdModuleAdminComponent } from '../std-module-admin/std-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    StdModuleAdminComponent,





  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsStdRoutingModule
  ]
})
export class LimsStdModule { }
