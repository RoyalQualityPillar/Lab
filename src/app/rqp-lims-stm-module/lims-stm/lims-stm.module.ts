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
import { StorageConditioMasterCreateUpdateComponent } from '../stm-masters/storage-condition-master/storage-conditio-master-create-update/storage-conditio-master-create-update.component';
import { StorageConditioMasterHomePageComponent } from '../stm-masters/storage-condition-master/storage-conditio-master-home-page/storage-conditio-master-home-page.component';
import { ChambersTypeMasterCreateUpdateComponent } from '../stm-masters/chambers-type-master/chambers-type-master-create-update/chambers-type-master-create-update.component';
import { ChambersTypeMasterHomePageComponent } from '../stm-masters/chambers-type-master/chambers-type-master-home-page/chambers-type-master-home-page.component';
import { ChambersRacksMasterCreateUpdateComponent } from '../stm-masters/chambers-racks-master/chambers-racks-master-create-update/chambers-racks-master-create-update.component';
import { ChambersRacksMasterHomePageComponent } from '../stm-masters/chambers-racks-master/chambers-racks-master-home-page/chambers-racks-master-home-page.component';
import { ChambersShellMasterCreateUpdateComponent } from '../stm-masters/chambers-shell-master/chambers-shell-master-create-update/chambers-shell-master-create-update.component';
import { ChambersShellMasterHomePageComponent } from '../stm-masters/chambers-shell-master/chambers-shell-master-home-page/chambers-shell-master-home-page.component';
import { StabilityProtRecHomePageComponent } from '../stm-masters/stability-protocol-record/stability-prot-rec-home-page/stability-prot-rec-home-page.component';
import { StabilityProtRecCreateUpdateComponent } from '../stm-masters/stability-protocol-record/stability-prot-rec-create-update/stability-prot-rec-create-update.component';
import { StabilityProtScheCreateUpdateComponent } from '../stm-masters/stability-protocol-schedule/stability-prot-sche-create-update/stability-prot-sche-create-update.component';
import { StabilityProtScheHomePageComponent } from '../stm-masters/stability-protocol-schedule/stability-prot-sche-home-page/stability-prot-sche-home-page.component';
import { StabilityProtScheRecCreateUpdateComponent } from '../stm-masters/stability-protocol-schedule-record/stability-prot-sche-rec-create-update/stability-prot-sche-rec-create-update.component';
import { StabilityProtScheRecHomePageComponent } from '../stm-masters/stability-protocol-schedule-record/stability-prot-sche-rec-home-page/stability-prot-sche-rec-home-page.component';


@NgModule({
  declarations: [
    StmModuleAdminComponent,
    StorageCategoryMasterHomePageComponent,
    StorageCategoryMasterCreateUpdateComponent,
    ChambersMasterHomePageComponent,
    ChambersMasterCreateUpdateComponent,
    
   
    StorageConditioMasterCreateUpdateComponent,
    StorageConditioMasterHomePageComponent,
    ChambersTypeMasterCreateUpdateComponent,
    ChambersTypeMasterHomePageComponent,
    ChambersRacksMasterHomePageComponent,
    ChambersRacksMasterCreateUpdateComponent,
    ChambersShellMasterCreateUpdateComponent,
    ChambersShellMasterHomePageComponent,
    StabilityProtRecCreateUpdateComponent,
    StabilityProtRecHomePageComponent,
    StabilityProtScheHomePageComponent,
    StabilityProtScheCreateUpdateComponent,
    StabilityProtScheRecHomePageComponent,
    StabilityProtScheRecCreateUpdateComponent,






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
