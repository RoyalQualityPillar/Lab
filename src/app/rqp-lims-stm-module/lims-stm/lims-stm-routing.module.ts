import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';

const routes: Routes = [
  {path:'stm-module-admin', component:StmModuleAdminComponent},


  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStmRoutingModule { }
