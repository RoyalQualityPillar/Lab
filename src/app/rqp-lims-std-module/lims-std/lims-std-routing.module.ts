import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdModuleAdminComponent } from '../std-module-admin/std-module-admin.component';
import { HomePageSampleRegestrationComponent } from '../std-masters/sample-regestration/home-page-sample-regestration/home-page-sample-regestration.component';
import { HomePageSampleTextPlanComponent } from '../std-masters/sample-test-plan/home-page-sample-text-plan/home-page-sample-text-plan.component';
import { HomePageWsLotPuritiesRecordComponent } from '../std-masters/ws-lot-purities-record/home-page-ws-lot-purities-record/home-page-ws-lot-purities-record.component';
import { HomePageWsLotContainersRecordComponent } from '../std-masters/ws-lot-containers-record/home-page-ws-lot-containers-record/home-page-ws-lot-containers-record.component';
import { HomePageWsLotContainersUsageComponent } from '../std-masters/ws-lot-containers-usage/home-page-ws-lot-containers-usage/home-page-ws-lot-containers-usage.component';
import { UtmHomePageComponent } from '../std-masters/usage-type-master/utm-home-page/utm-home-page.component';
import { PurityTypeMasterHomePageComponent } from '../std-masters/purity-type-master/purity-type-master-home-page/purity-type-master-home-page.component';
import { HomePageWsLotRecordComponent } from '../std-masters/ws-lot-record/home-page-ws-lot-record/home-page-ws-lot-record.component';
import { WslrInitiatorComponent } from '../wslr/wslr-initiator/wslr-initiator.component';
import { WslrUpdateComponent } from '../wslr/wslr-update/wslr-update.component';
import { WslrUpdateSaveComponent } from '../wslr/wslr-update-save/wslr-update-save.component';
import { WslrReviewerComponent } from '../wslr/wslr-reviewer/wslr-reviewer.component';
import { WslrReviewerSaveComponent } from '../wslr/wslr-reviewer-save/wslr-reviewer-save.component';
import { WslrCompletedComponent } from '../wslr/wslr-completed/wslr-completed.component';
import { WslrCompletedSaveComponent } from '../wslr/wslr-completed-save/wslr-completed-save.component';
import { WslrModuleAdminComponent } from '../wslr/wslr-module-admin/wslr-module-admin.component';
import { WslotContainersListComponent } from '../std-masters/wslot-containers-list/wslot-containers-list.component';
import { WslotConsumptionComponent } from '../std-masters/wslot-consumption/wslot-consumption.component';
import { PurityListComponent } from '../std-masters/purity-list/purity-list.component';
import { ContainersListComponent } from '../std-masters/containers-list/containers-list.component';

const routes: Routes = [
  { path: 'std-module-admin', component: StdModuleAdminComponent },
  { path: 'wslot-containers-list', component: WslotContainersListComponent },
  { path: 'purity-list', component: PurityListComponent },
  { path: 'containers-list', component: ContainersListComponent },
  { path: 'wslot-consumption', component: WslotConsumptionComponent },
  { path: 'home-page-sample-regestration', component: HomePageSampleRegestrationComponent },
  { path: 'home-page-sample-text-plan', component: HomePageSampleTextPlanComponent },
  { path: 'home-page-ws-lot-purities-record', component: HomePageWsLotPuritiesRecordComponent },
  { path: 'home-page-ws-lot-containers-record', component: HomePageWsLotContainersRecordComponent },
  { path: 'home-page-ws-lot-containers-usage', component: HomePageWsLotContainersUsageComponent },
  { path: 'utm-home-page', component: UtmHomePageComponent },
  { path: 'purity-type-master-home-page', component: PurityTypeMasterHomePageComponent },
  { path: 'home-page-ws-lot-record', component: HomePageWsLotRecordComponent },

  { path: 'wslr-initiator', component: WslrInitiatorComponent },
  { path: 'wslr-update', component: WslrUpdateComponent },
  { path: 'wslr-update-save', component: WslrUpdateSaveComponent },
  { path: 'wslr-reviewer', component: WslrReviewerComponent },
  { path: 'wslr-reviewer-save', component: WslrReviewerSaveComponent },
  { path: 'wslr-completed', component: WslrCompletedComponent },
  { path: 'wslr-completed-save', component: WslrCompletedSaveComponent },
  { path: 'wslr-module-admin', component: WslrModuleAdminComponent },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStdRoutingModule { }
