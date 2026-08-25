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


@NgModule({
  declarations: [
    StmModuleAdminComponent,
    StorageCategoryMasterHomePageComponent,
    StorageCategoryMasterCreateUpdateComponent,
    ChambersMasterHomePageComponent,
    ChambersMasterCreateUpdateComponent,
    





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
