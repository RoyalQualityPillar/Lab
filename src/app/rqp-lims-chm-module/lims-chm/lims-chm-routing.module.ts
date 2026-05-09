import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChmModuleAdminComponent } from '../chm-module-admin/chm-module-admin.component';
import { CmrHomePageComponent } from '../chm-masters/chemical-master-registration/cmr-home-page/cmr-home-page.component';
import { ClrHomePageComponent } from '../chm-masters/chm-lot-registration/clr-home-page/clr-home-page.component';
import { CluHomePageComponent } from '../chm-masters/chm-lot-usage/clu-home-page/clu-home-page.component';
import { TsmHomePageComponent } from '../chm-masters/test-solution-master/tsm-home-page/tsm-home-page.component';
import { TspicmHomePageComponent } from '../chm-masters/test-solution-preparation-input-chemical-master/tspicm-home-page/tspicm-home-page.component';
import { TestSolutionHomePageComponent } from '../chm-masters/test-solution/test-solution-home-page/test-solution-home-page.component';

const routes: Routes = [
  {path:'chm-module-admin', component:ChmModuleAdminComponent},
  {path:'cmr-home-page', component: CmrHomePageComponent},
  {path:'clr-home-page', component: ClrHomePageComponent},
  {path:'clu-home-page', component: CluHomePageComponent},
  {path:'tsm-home-page', component:TsmHomePageComponent},
  {path:'tspicm-home-page', component:TspicmHomePageComponent},
  {path:'test-Solution-Home-Page', component:TestSolutionHomePageComponent}




  
  



  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsChmRoutingModule { }
