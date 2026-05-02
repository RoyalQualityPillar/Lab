import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StdModuleAdminComponent } from '../std-module-admin/std-module-admin.component';

const routes: Routes = [
  {path:'std-module-admin', component:StdModuleAdminComponent},
  


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStdRoutingModule { }
