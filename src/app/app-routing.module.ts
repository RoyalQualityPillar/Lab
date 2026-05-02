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
  {
    path: 'lims-aqm',
    loadChildren: () =>
      import('./rqp-lims-aqm-module/lims-aqm/lims-aqm.module').then((m) => m.LimsAqmModule),
  },
  {
    path: 'lims-chm',
    loadChildren: () =>
      import('./rqp-lims-chm-module/lims-chm/lims-chm.module').then((m) => m.LimsChmModule),
  },
  {
    path: 'lims-rsm',
    loadChildren: () =>
      import('./rqp-lims-rsm-module/lims-rsm/lims-rsm.module').then((m) => m.LimsRsmModule),
  },
  {
    path: 'lims-std',
    loadChildren: () =>
      import('./rqp-lims-std-module/lims-std/lims-std.module').then((m) => m.LimsStdModule),
  },
  {
    path: 'lims-stm',
    loadChildren: () =>
      import('./rqp-lims-stm-module/lims-stm/lims-stm.module').then((m) => m.LimsStmModule),
  },
  {
    path: 'lims-vsm',
    loadChildren: () =>
      import('./rqp-lims-vsm-module/lims-vsm/lims-vsm.module').then((m) => m.LimsVsmModule),
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ correct for MFE remotes
  exports: [RouterModule],
})
export class AppRoutingModule { }
