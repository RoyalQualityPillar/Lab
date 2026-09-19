import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';
import { StorageCategoryMasterHomePageComponent } from '../stm-masters/storage-category-master/storage-category-master-home-page/storage-category-master-home-page.component';
import { ChambersMasterHomePageComponent } from '../stm-masters/chambers-master/chambers-master-home-page/chambers-master-home-page.component';
import { WsPeramentersHomePageComponent } from '../stm-masters/ws-peramenters-master/ws-peramenters-home-page/ws-peramenters-home-page.component';
import { WsTemplateIndexHomePageComponent } from '../stm-masters/ws-template-index/ws-template-index-home-page/ws-template-index-home-page.component';
import { WsPeraamentersRecordHomePageComponent } from '../stm-masters/ws-peraamenters-record/ws-peraamenters-record-home-page/ws-peraamenters-record-home-page.component';
import { WsStudyTypeHomePageComponent } from '../stm-masters/study-type/ws-study-type-home-page/ws-study-type-home-page.component';

const routes: Routes = [
  {path:'stm-module-admin', component:StmModuleAdminComponent},
{path:'storage-category-master-home-page', component: StorageCategoryMasterHomePageComponent },
{path:'chambers-master-home-page', component: ChambersMasterHomePageComponent },
{path:'ws-peramenters-home-page', component: WsPeramentersHomePageComponent },
{path:'ws-template-index-home-page', component: WsTemplateIndexHomePageComponent },
{path:'ws-peraamenters-record-home-page', component: WsPeraamentersRecordHomePageComponent },
{path:'ws-study-type-home-page', component: WsStudyTypeHomePageComponent },





  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStmRoutingModule { }
