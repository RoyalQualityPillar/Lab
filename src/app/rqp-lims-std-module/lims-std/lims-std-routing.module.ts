import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdModuleAdminComponent } from '../std-module-admin/std-module-admin.component';
import { HomePageSampleRegestrationComponent } from '../std-masters/sample-regestration/home-page-sample-regestration/home-page-sample-regestration.component';
import { HomePageSampleTextPlanComponent } from '../std-masters/sample-test-plan/home-page-sample-text-plan/home-page-sample-text-plan.component';

const routes: Routes = [
  {path:'std-module-admin', component:StdModuleAdminComponent},
  {path:'home-page-sample-regestration', component:HomePageSampleRegestrationComponent},
  {path:'home-page-sample-text-plan', component:HomePageSampleTextPlanComponent},
  
  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStdRoutingModule { }
