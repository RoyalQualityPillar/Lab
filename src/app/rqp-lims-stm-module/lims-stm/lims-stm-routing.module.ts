import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';
import { StorageCategoryMasterHomePageComponent } from '../stm-masters/storage-category-master/storage-category-master-home-page/storage-category-master-home-page.component';
import { ChambersMasterHomePageComponent } from '../stm-masters/chambers-master/chambers-master-home-page/chambers-master-home-page.component';
import { StbpInitiatorComponent } from '../stbp/stbp-initiator/stbp-initiator.component';
import { StbpUpdateComponent } from '../stbp/stbp-update/stbp-update.component';
import { StbpUpdateSaveComponent } from '../stbp/stbp-update-save/stbp-update-save.component';
import { StbpReviewerComponent } from '../stbp/stbp-reviewer/stbp-reviewer.component';
import { StbpReviewerSaveComponent } from '../stbp/stbp-reviewer-save/stbp-reviewer-save.component';
import { StbpCompletedComponent } from '../stbp/stbp-completed/stbp-completed.component';
import { StbpCompletedSaveComponent } from '../stbp/stbp-completed-save/stbp-completed-save.component';

const routes: Routes = [
  { path: 'stm-module-admin', component: StmModuleAdminComponent },
  { path: 'storage-category-master-home-page', component: StorageCategoryMasterHomePageComponent },
  { path: 'chambers-master-home-page', component: ChambersMasterHomePageComponent },
  { path: 'stbp-initiator', component: StbpInitiatorComponent },
  { path: 'stbp-update', component: StbpUpdateComponent },
  { path: 'stbp-update-save', component: StbpUpdateSaveComponent },
  { path: 'stbp-reviewer', component: StbpReviewerComponent },
  { path: 'stbp-reviewer-save', component: StbpReviewerSaveComponent },
  { path: 'stbp-completed', component: StbpCompletedComponent },
  { path: 'stbp-completed-save', component: StbpCompletedSaveComponent },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStmRoutingModule { }
