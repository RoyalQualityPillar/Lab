import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestRegistrationHomePageComponent } from '../test-registration/test-registration-home-page/test-registration-home-page.component';
import { TestRegistrationInitiatorComponent } from '../test-registration/test-registration-initiator/test-registration-initiator.component';
import { TestRegistrationUpdateComponent } from '../test-registration/test-registration-update/test-registration-update.component';
import { TestRegistrationUpdateSaveComponent } from '../test-registration/test-registration-update-save/test-registration-update-save.component';
import { TestRegistrationReviewComponent } from '../test-registration/test-registration-review/test-registration-review.component';
import { TestRegistrationReviewSaveComponent } from '../test-registration/test-registration-review-save/test-registration-review-save.component';
import { SpmModuleAdminComponent } from '../spm/spm-module-admin/spm-module-admin.component';
import { SpmInitiatorComponent } from '../spm/spm-initiator/spm-initiator.component';
import { SpmUpdateComponent } from '../spm/spm-update/spm-update.component';
import { SpmUpdateSaveComponent } from '../spm/spm-update-save/spm-update-save.component';
import { SpmReviewerSaveComponent } from '../spm/spm-reviewer-save/spm-reviewer-save.component';
import { SpmReviewerComponent } from '../spm/spm-reviewer/spm-reviewer.component';
import { SpmCompletedComponent } from '../spm/spm-completed/spm-completed.component';
import { SpmCompletedSaveComponent } from '../spm/spm-completed-save/spm-completed-save.component';
import { WsrHomeComponent } from '../wsr/wsr-home/wsr-home.component';
import { WsrInitiatorComponent } from '../wsr/wsr-initiator/wsr-initiator.component';
import { WsrUpdateComponent } from '../wsr/wsr-update/wsr-update.component';
import { WsrUpdateSaveComponent } from '../wsr/wsr-update-save/wsr-update-save.component';
import { WsrReviewerComponent } from '../wsr/wsr-reviewer/wsr-reviewer.component';
import { WsrReviewerSaveComponent } from '../wsr/wsr-reviewer-save/wsr-reviewer-save.component';
import { DmproductHomePageComponent } from '../spm-masters/dmproduct-master/dmproduct-home-page/dmproduct-home-page.component';
import { MaterialMasterHomePageComponent } from '../spm-masters/material-master-product/material-master-home-page/material-master-home-page.component';
import { WsrModuleAdminComponent } from '../wsr/wsr-module-admin/wsr-module-admin.component';
import { WsrCompletedSaveComponent } from '../wsr/wsr-completed-save/wsr-completed-save.component';
import { WsrCompletedComponent } from '../wsr/wsr-completed/wsr-completed.component';

const routes: Routes = [
  {
    path: 'wsr-home',
    component: WsrHomeComponent,
  },
  {
    path: 'wsr-init',
    component: WsrInitiatorComponent,
  },
  {
    path: 'wsr-update',
    component: WsrUpdateComponent,
  },
  {
    path: 'wsr-update-save',
    component: WsrUpdateSaveComponent,
  },
  {
    path: 'wsr-reviewer',
    component: WsrReviewerComponent,
  },
  {
    path: 'wsr-reviewer-save',
    component: WsrReviewerSaveComponent,
  },
   {
    path: 'wsr-completed',
    component: WsrCompletedComponent,
  },
  {
    path: 'wsr-completed-save',
    component: WsrCompletedSaveComponent,
  },
  {
    path: 'wsr-module-admin',
    component: WsrModuleAdminComponent,
  },
   {
    path: 'test-registration-home-page',
    component: TestRegistrationHomePageComponent,
  },
  {
    path: 'test-registration-initiator',
    component: TestRegistrationInitiatorComponent,
  },
  {
    path: 'test-registration-update',
    component: TestRegistrationUpdateComponent,
  },
  {
    path: 'test-registration-update-save',
    component: TestRegistrationUpdateSaveComponent,
  },
  {
    path: 'test-registration-reviewer',
    component: TestRegistrationReviewComponent,
  },
  {
    path: 'test-registration-reviewer-save',
    component: TestRegistrationReviewSaveComponent,
  },
  {
    path: 'spm-module-admin',
    component: SpmModuleAdminComponent,
  },
  {
    path: 'spm-initiator',
    component: SpmInitiatorComponent,
  },
   {
    path: 'spm-update',
    component: SpmUpdateComponent,
  },
  {
    path: 'spm-update-save',
    component: SpmUpdateSaveComponent,
  },
  {
    path: 'spm-reviewer-save',
    component: SpmReviewerSaveComponent,
  },
  {
    path: 'spm-reviewer',
    component: SpmReviewerComponent,
  },
  {
    path: 'spm-completed',
    component: SpmCompletedComponent,
  },
  {
    path: 'spm-completed-save',
    component: SpmCompletedSaveComponent,
  },
  {
    path: 'dmproduct-home-page',
    component: DmproductHomePageComponent,
  },
  {
    path: 'material-master-home-page',
    component: MaterialMasterHomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsSmRoutingModule { }
