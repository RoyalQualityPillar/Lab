import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChmModuleAdminComponent } from '../chm-module-admin/chm-module-admin.component';
import { CmrHomePageComponent } from '../chm-masters/chemical-master-registration/cmr-home-page/cmr-home-page.component';

const routes: Routes = [
  {path:'chm-module-admin', component:ChmModuleAdminComponent},
  {path:'cmr-home-page', component: CmrHomePageComponent}
  
  



  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsChmRoutingModule { }
