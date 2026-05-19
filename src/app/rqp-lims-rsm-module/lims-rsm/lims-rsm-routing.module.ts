import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RsmModuleAdminComponent } from '../rsm-module-admin/rsm-module-admin.component';

const routes: Routes = [
  {path:'rsm-module-admin', component:RsmModuleAdminComponent},
  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsRsmRoutingModule { }
