import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsVsmRoutingModule } from './lims-vsm-routing.module';
import { VsmModuleAdminComponent } from '../vsm-module-admin/vsm-module-admin.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { CustomDatePipe } from 'src/app/pipe/custom-date.pipe';
import { VsuCreateUpdateComponent } from '../vsm-master/volumetric solution usage/vsu-create-update/vsu-create-update.component';
import { VsuHomePageComponent } from '../vsm-master/volumetric solution usage/vsu-home-page/vsu-home-page.component';
import { SnmCreateUpdateComponent } from '../vsm-master/solution-name-master/snm-create-update/snm-create-update.component';
import { SnmHomePageComponent } from '../vsm-master/solution-name-master/snm-home-page/snm-home-page.component';
import { StmCreateUpdateComponent } from '../vsm-master/solution-templet-master/stm-create-update/stm-create-update.component';
import { StmHomePageComponent } from '../vsm-master/solution-templet-master/stm-home-page/stm-home-page.component';
import { SpmCreateUpdateComponent } from '../vsm-master/solution-preparation-master/spm-create-update/spm-create-update.component';
import { SpmHomePageComponent } from '../vsm-master/solution-preparation-master/spm-home-page/spm-home-page.component';
import { SampleRegestrationVsCreateUpdateComponent } from '../vsm-master/sample-regestration-vs-master/sample-regestration-vs-create-update/sample-regestration-vs-create-update.component';
import { SampleRegestrationVsHomePageComponent } from '../vsm-master/sample-regestration-vs-master/sample-regestration-vs-home-page/sample-regestration-vs-home-page.component';
import { SampleTestPlanVsCreateUpdateComponent } from '../vsm-master/sample-test-plan-vs-master/sample-test-plan-vs-create-update/sample-test-plan-vs-create-update.component';
import { SampleTestPlanVsHomePageComponent } from '../vsm-master/sample-test-plan-vs-master/sample-test-plan-vs-home-page/sample-test-plan-vs-home-page.component';


@NgModule({
  declarations: [
    VsmModuleAdminComponent,
    VsuCreateUpdateComponent,
    VsuHomePageComponent,
      SnmCreateUpdateComponent,
        SnmHomePageComponent,
          StmCreateUpdateComponent,
      StmHomePageComponent,
    SpmCreateUpdateComponent,
      SpmHomePageComponent,
       SampleRegestrationVsCreateUpdateComponent,
    SampleRegestrationVsHomePageComponent,
      SampleTestPlanVsCreateUpdateComponent,
        SampleTestPlanVsHomePageComponent,
       
    
   
       
     





  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LimsVsmRoutingModule,
  ]
})
export class LimsVsmModule { }
