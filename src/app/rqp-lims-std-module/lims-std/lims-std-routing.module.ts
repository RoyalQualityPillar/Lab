import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdModuleAdminComponent } from '../std-module-admin/std-module-admin.component';
import { HomePageSampleRegestrationComponent } from '../std-masters/sample-regestration/home-page-sample-regestration/home-page-sample-regestration.component';
import { HomePageSampleTextPlanComponent } from '../std-masters/sample-test-plan/home-page-sample-text-plan/home-page-sample-text-plan.component';
import { HomePageWsLotPuritiesRecordComponent } from '../std-masters/ws-lot-purities-record/home-page-ws-lot-purities-record/home-page-ws-lot-purities-record.component';
import { HomePageWsLotContainersRecordComponent } from '../std-masters/ws-lot-containers-record/home-page-ws-lot-containers-record/home-page-ws-lot-containers-record.component';
import { HomePageWsLotContainersUsageComponent } from '../std-masters/ws-lot-containers-usage/home-page-ws-lot-containers-usage/home-page-ws-lot-containers-usage.component';
import { HomePageWsLotRecordComponent } from '../std-masters/ws-lot-record/home-page-ws-lot-record/home-page-ws-lot-record.component';

const routes: Routes = [
  {path:'std-module-admin', component:StdModuleAdminComponent},
  {path:'home-page-sample-regestration', component:HomePageSampleRegestrationComponent},
  {path:'home-page-sample-text-plan', component:HomePageSampleTextPlanComponent},
  {path:'home-page-ws-lot-purities-record', component:HomePageWsLotPuritiesRecordComponent},
  {path:'home-page-ws-lot-containers-record', component:HomePageWsLotContainersRecordComponent},
  {path:'home-page-ws-lot-containers-usage', component:HomePageWsLotContainersUsageComponent},
  {path:'home-page-ws-lot-record', component:HomePageWsLotRecordComponent},
  
  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStdRoutingModule { }
