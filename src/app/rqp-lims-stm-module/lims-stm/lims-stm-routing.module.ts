import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';
import { StorageCategoryMasterHomePageComponent } from '../stm-masters/storage-category-master/storage-category-master-home-page/storage-category-master-home-page.component';
import { ChambersMasterHomePageComponent } from '../stm-masters/chambers-master/chambers-master-home-page/chambers-master-home-page.component';
import { WsPeramentersHomePageComponent } from '../stm-masters/ws-peramenters-master/ws-peramenters-home-page/ws-peramenters-home-page.component';
import { WsTemplateIndexHomePageComponent } from '../stm-masters/ws-template-index/ws-template-index-home-page/ws-template-index-home-page.component';
import { WsPeraamentersRecordHomePageComponent } from '../stm-masters/ws-peraamenters-record/ws-peraamenters-record-home-page/ws-peraamenters-record-home-page.component';
import { WsStudyTypeHomePageComponent } from '../stm-masters/study-type/ws-study-type-home-page/ws-study-type-home-page.component';
import { ChambersRacksMasterHomePageComponent } from '../stm-masters/chambers-racks-master/chambers-racks-master-home-page/chambers-racks-master-home-page.component';
import { ChambersShellMasterHomePageComponent } from '../stm-masters/chambers-shell-master/chambers-shell-master-home-page/chambers-shell-master-home-page.component';
import { ChambersTypeMasterHomePageComponent } from '../stm-masters/chambers-type-master/chambers-type-master-home-page/chambers-type-master-home-page.component';
import { StabilityProtRecHomePageComponent } from '../stm-masters/stability-protocol-record/stability-prot-rec-home-page/stability-prot-rec-home-page.component';
import { StabilityProtScheHomePageComponent } from '../stm-masters/stability-protocol-schedule/stability-prot-sche-home-page/stability-prot-sche-home-page.component';
import { StabilityProtScheRecHomePageComponent } from '../stm-masters/stability-protocol-schedule-record/stability-prot-sche-rec-home-page/stability-prot-sche-rec-home-page.component';
import { StorageConditioMasterHomePageComponent } from '../stm-masters/storage-condition-master/storage-conditio-master-home-page/storage-conditio-master-home-page.component';

const routes: Routes = [
  {path:'stm-module-admin', component:StmModuleAdminComponent},
{path:'storage-category-master-home-page', component: StorageCategoryMasterHomePageComponent },
{path:'chambers-master-home-page', component: ChambersMasterHomePageComponent },
{path:'ws-peramenters-home-page', component: WsPeramentersHomePageComponent },
{path:'ws-template-index-home-page', component: WsTemplateIndexHomePageComponent },
{path:'ws-peraamenters-record-home-page', component: WsPeraamentersRecordHomePageComponent },
{path:'ws-study-type-home-page', component: WsStudyTypeHomePageComponent },
{path:'chambers-racks-master-home-page', component: ChambersRacksMasterHomePageComponent },
{path:'chambers-shell-master-home-page', component: ChambersShellMasterHomePageComponent },
{path:'chambers-type-master-home-page', component: ChambersTypeMasterHomePageComponent },
{path:'stability-prot-rec-home-page', component: StabilityProtRecHomePageComponent },
{path:'stability-prot-sche-home-page', component: StabilityProtScheHomePageComponent },
{path:'stability-prot-sche-rec-home-page', component: StabilityProtScheRecHomePageComponent },
{path:'storage-conditio-master-home-page', component: StorageConditioMasterHomePageComponent },








];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStmRoutingModule { }
