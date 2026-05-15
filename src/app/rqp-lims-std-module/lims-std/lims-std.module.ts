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
import { CreateUpdateWsLotPuritiesRecordComponent } from '../std-masters/ws-lot-purities-record/create-update-ws-lot-purities-record/create-update-ws-lot-purities-record.component';
import { HomePageWsLotPuritiesRecordComponent } from '../std-masters/ws-lot-purities-record/home-page-ws-lot-purities-record/home-page-ws-lot-purities-record.component';
import { CreateUpdateWsLotContainersRecordComponent } from '../std-masters/ws-lot-containers-record/create-update-ws-lot-containers-record/create-update-ws-lot-containers-record.component';
import { HomePageWsLotContainersRecordComponent } from '../std-masters/ws-lot-containers-record/home-page-ws-lot-containers-record/home-page-ws-lot-containers-record.component';
import { CreateUpdateWsLotContainersUsageComponent } from '../std-masters/ws-lot-containers-usage/create-update-ws-lot-containers-usage/create-update-ws-lot-containers-usage.component';
import { HomePageWsLotContainersUsageComponent } from '../std-masters/ws-lot-containers-usage/home-page-ws-lot-containers-usage/home-page-ws-lot-containers-usage.component';
import { PurityTypeMasterCreateUpdateComponent } from '../std-masters/purity-type-master/purity-type-master-create-update/purity-type-master-create-update.component';
import { PurityTypeMasterHomePageComponent } from '../std-masters/purity-type-master/purity-type-master-home-page/purity-type-master-home-page.component';


@NgModule({
  declarations: [
    StdModuleAdminComponent,
    CreateUpdateSampleRegestrationComponent,
    HomePageSampleRegestrationComponent,
    HomePageSampleTextPlanComponent,
    CreateUpdateSampleTextPlanComponent,
    CreateUpdateWsLotPuritiesRecordComponent,
    HomePageWsLotPuritiesRecordComponent,
    CreateUpdateWsLotContainersRecordComponent,
    HomePageWsLotContainersRecordComponent,
    CreateUpdateWsLotContainersUsageComponent,
    HomePageWsLotContainersUsageComponent,
     PurityTypeMasterCreateUpdateComponent,
    PurityTypeMasterHomePageComponent,

  





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
