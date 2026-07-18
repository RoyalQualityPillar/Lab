import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AqNominationHomePageComponent } from '../aq-master/aq-nomination/aq-nomination-home-page/aq-nomination-home-page.component';
import { AqmModuleAdminComponent } from '../aqm-module-admin/aqm-module-admin.component';

const routes: Routes = [
{
      path: 'aqm-module-admin',
      component: AqmModuleAdminComponent,
  
    },



   {
      path: 'aq-nomination-home-page',
      component: AqNominationHomePageComponent,
  
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AqRoutingModule {

  
 }
