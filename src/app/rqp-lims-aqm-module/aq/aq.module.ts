import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AqRoutingModule } from './aq-routing.module';
import { AqNominationHomePageComponent } from '../aq-master/aq-nomination/aq-nomination-home-page/aq-nomination-home-page.component';
import { AqmModuleAdminComponent } from '../aqm-module-admin/aqm-module-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/common/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { AqNominationCreateUpdateComponent } from '../aq-master/aq-nomination/aq-nomination-create-update/aq-nomination-create-update.component';


@NgModule({
  declarations: [

AqNominationHomePageComponent,
AqNominationCreateUpdateComponent,
AqmModuleAdminComponent,

  ],
  imports: [
    CommonModule,
    AqRoutingModule,
     FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
  ],
})
export class AqModule { }
