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
  path: 'lims-aq',
  loadChildren: () =>
    import('./rqp-lims-aqm-module/aq/aq.module').then(m => m.AqModule)
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
    path: 'lims-spc',
    loadChildren: () =>
      import('./rqp-lims-spc-module/lims-spc/lims-spc.module').then((m) => m.LimsSpcModule),
  },
  {
    path: 'lims-sm',
    loadChildren: () =>
      import('./rqp-lims-sm-module/lims-sm/lims-sm.module').then((m) => m.LimsSmModule),
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
  {
    path: 'excel',
    loadChildren: () =>
      import('./rqp-excel-module/excel/excel.module').then((m) => m.ExcelModule),
  },
  //  {
  //   path: 'lims-aq',
  //   loadChildren: () =>
  //     import('./rqp-lims-aq-module/lims-aq/lims-aq.module').then((m) => m.LimsAqmModule),
  // },


];
@NgModule({
  imports: [RouterModule.forChild(routes)], // ✅ correct for MFE remotes
  exports: [RouterModule],
})
export class AppRoutingModule { }
