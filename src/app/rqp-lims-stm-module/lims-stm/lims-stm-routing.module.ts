import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StmModuleAdminComponent } from '../stm-module-admin/stm-module-admin.component';
import { StorageCategoryMasterHomePageComponent } from '../stm-masters/storage-category-master/storage-category-master-home-page/storage-category-master-home-page.component';
import { ChambersMasterHomePageComponent } from '../stm-masters/chambers-master/chambers-master-home-page/chambers-master-home-page.component';

const routes: Routes = [
  {path:'stm-module-admin', component:StmModuleAdminComponent},
{path:'storage-category-master-home-page', component: StorageCategoryMasterHomePageComponent },
{path:'chambers-master-home-page', component: ChambersMasterHomePageComponent },




  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsStmRoutingModule { }
