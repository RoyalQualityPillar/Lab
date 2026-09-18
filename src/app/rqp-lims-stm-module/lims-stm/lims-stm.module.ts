import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsStmRoutingModule } from './lims-stm-routing.module';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { StorageCategoryMasterHomePageComponent } from '../stm-masters/storage-category-master/storage-category-master-home-page/storage-category-master-home-page.component';
//import { StorageCategoryMasterHomeCreateUpdateComponent } from '../stm-masters/storage-category-master/storage-category-master-home-create-update/storage-category-master-home-create-update.component';
import { StorageCategoryMasterCreateUpdateComponent } from '../stm-masters/storage-category-master/storage-category-master-create-update/storage-category-master-create-update.component';
import { ChambersMasterCreateUpdateComponent } from '../stm-masters/chambers-master/chambers-master-create-update/chambers-master-create-update.component';
import { ChambersMasterHomePageComponent } from '../stm-masters/chambers-master/chambers-master-home-page/chambers-master-home-page.component';
import { WsPeramentersHomePageComponent } from '../stm-masters/ws-peramenters-master/ws-peramenters-home-page/ws-peramenters-home-page.component';
import { WsPeramentersCreateUpdateComponent } from '../stm-masters/ws-peramenters-master/ws-peramenters-create-update/ws-peramenters-create-update.component';
import { WsTemplateIndexCreateUpdateComponent } from '../stm-masters/ws-template-index/ws-template-index-create-update/ws-template-index-create-update.component';
import { WsTemplateIndexHomePageComponent } from '../stm-masters/ws-template-index/ws-template-index-home-page/ws-template-index-home-page.component';
import { WsPeraamentersRecordCreateUpdateComponent } from '../stm-masters/ws-peraamenters-record/ws-peraamenters-record-create-update/ws-peraamenters-record-create-update.component';
import { WsPeraamentersRecordHomePageComponent } from '../stm-masters/ws-peraamenters-record/ws-peraamenters-record-home-page/ws-peraamenters-record-home-page.component';
import { WsStudyTypeCreateUpdateComponent } from '../stm-masters/study-type/ws-study-type-create-update/ws-study-type-create-update.component';
import { WsStudyTypeHomePageComponent } from '../stm-masters/study-type/ws-study-type-home-page/ws-study-type-home-page.component';


@NgModule({
  declarations: [
    StmModuleAdminComponent,
    StorageCategoryMasterHomePageComponent,
    StorageCategoryMasterCreateUpdateComponent,
    ChambersMasterHomePageComponent,
    ChambersMasterCreateUpdateComponent,
     WsPeramentersHomePageComponent,
      WsPeramentersCreateUpdateComponent,
     WsTemplateIndexCreateUpdateComponent,
    WsTemplateIndexHomePageComponent,
    WsPeraamentersRecordHomePageComponent,
    WsPeraamentersRecordCreateUpdateComponent,
      WsStudyTypeHomePageComponent,
    WsStudyTypeCreateUpdateComponent,
   
   
    





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
