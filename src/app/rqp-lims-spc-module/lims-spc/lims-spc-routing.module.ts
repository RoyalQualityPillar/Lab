import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimsSpcMasterHomePageComponent } from '../masterdata/lims-spc-master-home-page/lims-spc-master-home-page.component';
import { FieldMasterHomePageComponent } from '../masterdata/field-master-home-page/field-master-home-page.component';
import { FieldMasterCreateUpdateComponent } from '../masterdata/field-master-create-update/field-master-create-update.component';
import { WsMasterHomePageComponent } from '../masterdata/ws-master-home-page/ws-master-home-page.component';
import { WsMasterCreateUpdateComponent } from '../masterdata/ws-master-create-update/ws-master-create-update.component';

const routes: Routes = [
        { path: 'lims-spc-master-home-page', component:LimsSpcMasterHomePageComponent},
          { path: 'field-master-home-page', component:FieldMasterHomePageComponent},
        { path: 'field-master-create-update', component:FieldMasterCreateUpdateComponent},
        { path: 'ws-master-home-page', component:WsMasterHomePageComponent},
        { path: 'ws-master-create-update', component:WsMasterCreateUpdateComponent},

          ,
    ,
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimsSpcRoutingModule { }
