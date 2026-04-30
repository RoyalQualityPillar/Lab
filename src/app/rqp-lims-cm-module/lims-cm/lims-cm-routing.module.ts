import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CciMasterHomePageComponent } from '../lims-cm-master/cci-master/cci-master-home-page/cci-master-home-page.component';
import { LimsCmMasterHomePageComponent } from '../lims-cm-master/lims-cm-master-home-page/lims-cm-master-home-page.component';
import { LimsCmModuleHomePageComponent } from '../lims-cm-module-home-page/lims-cm-module-home-page.component';
import { ClMasterHomePageComponent } from '../lims-cm-master/cl-master/cl-master-home-page/cl-master-home-page.component';
import { ColumnMasterHomePageComponent } from '../lims-cm-master/column-master/column-master-home-page/column-master-home-page.component';

const routes: Routes = [
  {
    path: 'lims-cm-module-home-page',
    component: LimsCmModuleHomePageComponent,
  },
  {
    path: 'lims-cm-master-home-page',
    component: LimsCmMasterHomePageComponent,
  },
  {
    path: 'lims-cm-master-home-page/lims-cm-cci-home-page',
    component: CciMasterHomePageComponent,
  },
  {
    path: 'lims-cm-master-home-page/lims-cm-cl-home-page',
    component: ClMasterHomePageComponent,
  },
  {
    path: 'lims-cm-master-home-page/lims-cm-column-home-page',
    component: ColumnMasterHomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimsCmRoutingModule {}
