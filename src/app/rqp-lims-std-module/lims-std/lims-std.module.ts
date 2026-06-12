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
import { UtmCreateUpdateComponent } from '../std-masters/usage-type-master/utm-create-update/utm-create-update.component';
import { UtmHomePageComponent } from '../std-masters/usage-type-master/utm-home-page/utm-home-page.component';
import { PurityTypeMasterCreateUpdateComponent } from '../std-masters/purity-type-master/purity-type-master-create-update/purity-type-master-create-update.component';
import { PurityTypeMasterHomePageComponent } from '../std-masters/purity-type-master/purity-type-master-home-page/purity-type-master-home-page.component';
import { CreateUpdateWsLotRecordComponent } from '../std-masters/ws-lot-record/create-update-ws-lot-record/create-update-ws-lot-record.component';
import { HomePageWsLotRecordComponent } from '../std-masters/ws-lot-record/home-page-ws-lot-record/home-page-ws-lot-record.component';
import { WslrInitiatorComponent } from '../wslr/wslr-initiator/wslr-initiator.component';
import { WslrUpdateComponent } from '../wslr/wslr-update/wslr-update.component';
import { WslrUpdateSaveComponent } from '../wslr/wslr-update-save/wslr-update-save.component';
import { WslrReviewerComponent } from '../wslr/wslr-reviewer/wslr-reviewer.component';
import { WslrReviewerSaveComponent } from '../wslr/wslr-reviewer-save/wslr-reviewer-save.component';
import { WslrCompletedComponent } from '../wslr/wslr-completed/wslr-completed.component';
import { WslrCompletedSaveComponent } from '../wslr/wslr-completed-save/wslr-completed-save.component';
import { WslrModuleAdminComponent } from '../wslr/wslr-module-admin/wslr-module-admin.component';


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
    UtmCreateUpdateComponent,
    UtmHomePageComponent,
    PurityTypeMasterCreateUpdateComponent,
    PurityTypeMasterHomePageComponent,
    CreateUpdateWsLotRecordComponent,
    HomePageWsLotRecordComponent,
    WslrInitiatorComponent,
    WslrUpdateComponent,
    WslrUpdateSaveComponent,
    WslrReviewerComponent,
    WslrReviewerSaveComponent,
    WslrCompletedComponent,
    WslrCompletedSaveComponent,
    WslrModuleAdminComponent,







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
