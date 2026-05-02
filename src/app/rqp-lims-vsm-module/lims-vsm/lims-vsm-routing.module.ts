import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VsmModuleAdminComponent } from '../vsm-module-admin/vsm-module-admin.component';

const routes: Routes = [
  {path:'vsm-module-admin', component: VsmModuleAdminComponent},
  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsVsmRoutingModule { }
