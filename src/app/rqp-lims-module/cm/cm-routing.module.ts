import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmInitiatorComponent } from './cm/cm-initiator/cm-initiator.component';
import { CmCompletedComponent } from './cm/cm-completed/cm-completed.component';

const routes: Routes = [
    {
      path: 'cm-initiator',
      component: CmInitiatorComponent,
    },
    {
      path: 'cm-completed',
      component: CmCompletedComponent,
    },
     
     
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmRoutingModule { }
