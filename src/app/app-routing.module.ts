import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('../rqp-admin-module/admin/admin.module').then((m) => m.AdminModule),
  // },
  

 {
    path: 'lims',
    loadChildren: () =>
      import('./rqp-lims-module/lims/lims.module').then((m) => m.LimsModule),
  },
  {
    path: 'lims-cm',
    loadChildren: () =>
      import('./rqp-lims-cm-module/lims-cm/lims-cm.module').then((m) => m.LimsCmModule),
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ correct for MFE remotes
  exports: [RouterModule],
})
export class AppRoutingModule {}
