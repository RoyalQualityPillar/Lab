import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimsSpcRoutingModule } from './lims-spc-routing.module';
import { LimsSpcMasterHomePageComponent } from '../masterdata/lims-spc-master-home-page/lims-spc-master-home-page.component';
import { FieldMasterHomePageComponent } from '../masterdata/field-master-home-page/field-master-home-page.component';
import { FieldMasterCreateUpdateComponent } from '../masterdata/field-master-create-update/field-master-create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/common/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { CustomDatePipe } from 'src/app/pipe/custom-date.pipe';
import { WsMasterCreateUpdateComponent } from '../masterdata/ws-master-create-update/ws-master-create-update.component';
import { WsMasterHomePageComponent } from '../masterdata/ws-master-home-page/ws-master-home-page.component';


@NgModule({
  declarations: [
    LimsSpcMasterHomePageComponent,
      FieldMasterCreateUpdateComponent,
    FieldMasterHomePageComponent,
      WsMasterCreateUpdateComponent,
    WsMasterHomePageComponent,
  ],
  imports: [
    CommonModule,
    LimsSpcRoutingModule,
        //CKEditorModule,
        FormsModule,
        MatTableModule,
        ReactiveFormsModule,
        SharedModule,
        AngularMaterialModule,
        // CustomDatePipe,
  ]
})
export class LimsSpcModule { }
