import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VsmModuleAdminComponent } from '../vsm-module-admin/vsm-module-admin.component';
import { VsuHomePageComponent } from '../vsm-master/volumetric solution usage/vsu-home-page/vsu-home-page.component';
import { SnmHomePageComponent } from '../vsm-master/solution-name-master/snm-home-page/snm-home-page.component';
import { StmHomePageComponent } from '../vsm-master/solution-templet-master/stm-home-page/stm-home-page.component';
import { SpmHomePageComponent } from '../vsm-master/solution-preparation-master/spm-home-page/spm-home-page.component';
import { SampleRegestrationVsHomePageComponent } from '../vsm-master/sample-regestration-vs-master/sample-regestration-vs-home-page/sample-regestration-vs-home-page.component';
import { SampleTestPlanVsHomePageComponent } from '../vsm-master/sample-test-plan-vs-master/sample-test-plan-vs-home-page/sample-test-plan-vs-home-page.component';

const routes: Routes = [
  {path:'vsm-module-admin', component: VsmModuleAdminComponent},
  {path:'vsu-home-page', component: VsuHomePageComponent},
  {path:'snm-home-page', component: SnmHomePageComponent,},
   {path:'stm-home-page', component: StmHomePageComponent,},
   {path:'spm-home-page', component: SpmHomePageComponent,},
    {path:'sample-regestration-vs-home-page', component: SampleRegestrationVsHomePageComponent,},
      {path:'sample-test-plan-vs-home-page', component:  SampleTestPlanVsHomePageComponent,},
  
  
  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsVsmRoutingModule { }
