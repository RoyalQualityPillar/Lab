import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChmModuleAdminComponent } from '../chm-module-admin/chm-module-admin.component';

const routes: Routes = [
  {path:'chm-module-admin', component:ChmModuleAdminComponent},
  



  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsChmRoutingModule { }
