import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsStmRoutingModule } from './lims-stm-routing.module';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';


@NgModule({
  declarations: [
    StmModuleAdminComponent,





  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsStmRoutingModule
  ]
})
export class LimsStmModule { }
