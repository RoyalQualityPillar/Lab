import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/common/shared.module';

import { CmRoutingModule } from './cm-routing.module';
import { CmInitiatorComponent } from './cm/cm-initiator/cm-initiator.component';
import { PmsListComponent } from './pms-list/pms-list.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CmCompletedComponent } from './cm/cm-completed/cm-completed.component';
//import { CmCompletedSaveComponent } from './cm/cm-completed-save/cm-completed-save.component';



@NgModule({
  declarations: [
    CmInitiatorComponent,
    PmsListComponent,
    CmCompletedComponent,
    //CmCompletedSaveComponent,
    
  
   
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
    CmRoutingModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmModule { }
