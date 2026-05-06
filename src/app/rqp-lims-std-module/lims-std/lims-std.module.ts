import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsStdRoutingModule } from './lims-std-routing.module';
import { StdModuleAdminComponent } from '../std-module-admin/std-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { CreateUpdateSampleRegestrationComponent } from '../std-masters/sample-regestration/create-update-sample-regestration/create-update-sample-regestration.component';
import { HomePageSampleRegestrationComponent } from '../std-masters/sample-regestration/home-page-sample-regestration/home-page-sample-regestration.component';
import { CreateUpdateSampleTextPlanComponent } from '../std-masters/sample-test-plan/create-update-sample-text-plan/create-update-sample-text-plan.component';
import { HomePageSampleTextPlanComponent } from '../std-masters/sample-test-plan/home-page-sample-text-plan/home-page-sample-text-plan.component';


@NgModule({
  declarations: [
    StdModuleAdminComponent,
    CreateUpdateSampleRegestrationComponent,
    HomePageSampleRegestrationComponent,
    HomePageSampleTextPlanComponent,
    CreateUpdateSampleTextPlanComponent,





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
