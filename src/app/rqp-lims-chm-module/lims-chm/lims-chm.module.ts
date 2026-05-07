import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsChmRoutingModule } from './lims-chm-routing.module';
import { ChmModuleAdminComponent } from '../chm-module-admin/chm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { CmrCreateUpdateComponent } from '../chm-masters/chemical-master-registration/cmr-create-update/cmr-create-update.component';
import { CmrHomePageComponent } from '../chm-masters/chemical-master-registration/cmr-home-page/cmr-home-page.component';


@NgModule({
  declarations: [
    ChmModuleAdminComponent,
    CmrCreateUpdateComponent,
    CmrHomePageComponent,




  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsChmRoutingModule
  ]
})
export class LimsChmModule { }
