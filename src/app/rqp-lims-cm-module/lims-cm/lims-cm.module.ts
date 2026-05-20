import { NgModule } from '@angular/core';
import { LimsCmModuleHomePageComponent } from '../lims-cm-module-home-page/lims-cm-module-home-page.component';
import { LimsCmMasterHomePageComponent } from '../lims-cm-master/lims-cm-master-home-page/lims-cm-master-home-page.component';
import { CciMasterAllComponent } from '../lims-cm-master/cci-master/cci-master-all/cci-master-all.component';

import { ClMasterCreateUpdateComponent } from '../lims-cm-master/cl-master/cl-master-create-update/cl-master-create-update.component';
import { ClMasterHomePageComponent } from '../lims-cm-master/cl-master/cl-master-home-page/cl-master-home-page.component';
import { ColumnMasterCreateUpdateComponent } from '../lims-cm-master/column-master/column-master-create-update/column-master-create-update.component';
import { ColumnMasterHomePageComponent } from '../lims-cm-master/column-master/column-master-home-page/column-master-home-page.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { LimsCmRoutingModule } from './lims-cm-routing.module';
import { CciMasterActiveComponent } from '../lims-cm-master/cci-master/cci-master-active/cci-master-active.component';
import { CciMasterCreateUpdateComponent } from '../lims-cm-master/cci-master/cci-master-create-update/cci-master-create-update.component';
import { CciMasterHomePageComponent } from '../lims-cm-master/cci-master/cci-master-home-page/cci-master-home-page.component';


@NgModule({
  declarations: [
    LimsCmModuleHomePageComponent,
    LimsCmMasterHomePageComponent,
    CciMasterAllComponent,
   
    
    ClMasterCreateUpdateComponent,
    ClMasterHomePageComponent,
    ColumnMasterCreateUpdateComponent,
    ColumnMasterHomePageComponent,
    CciMasterActiveComponent,
    CciMasterCreateUpdateComponent,
    CciMasterHomePageComponent
  ],

  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LimsCmRoutingModule,
    SharedModule,
  ],
})
export class LimsCmModule {}
