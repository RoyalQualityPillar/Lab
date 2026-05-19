import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AqmModuleAdminComponent } from '../aqm-module-admin/aqm-module-admin.component';

const routes: Routes = [
  {path:'aqm-module-admin', component:AqmModuleAdminComponent},
  




  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsAqmRoutingModule { }
