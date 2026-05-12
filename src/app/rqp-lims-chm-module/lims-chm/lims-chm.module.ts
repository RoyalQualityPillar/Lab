import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsChmRoutingModule } from './lims-chm-routing.module';
import { ChmModuleAdminComponent } from '../chm-module-admin/chm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { CmrCreateUpdateComponent } from '../chm-masters/chemical-master-registration/cmr-create-update/cmr-create-update.component';
import { CmrHomePageComponent } from '../chm-masters/chemical-master-registration/cmr-home-page/cmr-home-page.component';
import { ClrCreateUpdateComponent } from '../chm-masters/chm-lot-registration/clr-create-update/clr-create-update.component';
import { ClrHomePageComponent } from '../chm-masters/chm-lot-registration/clr-home-page/clr-home-page.component';
import { CluHomePageComponent } from '../chm-masters/chm-lot-usage/clu-home-page/clu-home-page.component';
import { CluCreateUpdateComponent } from '../chm-masters/chm-lot-usage/clu-create-update/clu-create-update.component';
import { TsmCreateUpdateComponent } from '../chm-masters/test-solution-master/tsm-create-update/tsm-create-update.component';
import { TsmHomePageComponent } from '../chm-masters/test-solution-master/tsm-home-page/tsm-home-page.component';
import { TspicmCreateUpdateComponent } from '../chm-masters/test-solution-preparation-input-chemical-master/tspicm-create-update/tspicm-create-update.component';
import { TspicmHomePageComponent } from '../chm-masters/test-solution-preparation-input-chemical-master/tspicm-home-page/tspicm-home-page.component';
import { TspicCreateUpdateComponent } from '../chm-masters/test-solution-preparation-input-chemicals/tspic-create-update/tspic-create-update.component';
import { TspicHomePageComponent } from '../chm-masters/test-solution-preparation-input-chemicals/tspic-home-page/tspic-home-page.component';
import { TestSolutionHomePageComponent } from '../chm-masters/test-solution/test-solution-home-page/test-solution-home-page.component';
import { TestSolutionCreateUpdateComponent } from '../chm-masters/test-solution/test-solution-create-update/test-solution-create-update.component';


@NgModule({
  declarations: [
    ChmModuleAdminComponent,
    CmrCreateUpdateComponent,
    CmrHomePageComponent,
    ClrCreateUpdateComponent,
    ClrHomePageComponent,
    CluCreateUpdateComponent,
    CluHomePageComponent,
    TsmCreateUpdateComponent,
    TsmHomePageComponent,
    TspicmCreateUpdateComponent,
    TspicmHomePageComponent,
    TestSolutionCreateUpdateComponent,
    TestSolutionHomePageComponent,
    TspicCreateUpdateComponent,
    TspicHomePageComponent
    
    
    


    
    
        




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
