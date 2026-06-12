import { NgModule } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LovDialogComponent } from './common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import { SharedModule } from './common/shared.module';
import { NciReviewDetailComponent } from './rqp-qms-module/nci-review-detail/nci-review-detail.component';
import { DropdownListComponent } from './rqp-dms-module/sop/dropdown-list/dropdown-list.component';
import { ActionAttachmentsListComponent } from './rqp-lims-module/ism/action-attachments-list/action-attachments-list.component';

import { IsmUpdateComponent } from './rqp-lims-module/ism/ism-update/ism-update.component';
import { StorageCategoryMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/storage-category-master/storage-category-master-home-page/storage-category-master-home-page.component';

import { StorageCategoryMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/storage-category-master/storage-category-master-create-update/storage-category-master-create-update.component';
import { ChambersMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/chambers-master/chambers-master-home-page/chambers-master-home-page.component';
//import { ChambersMasterUpdateCreateComponent } from './rqp-lims-stm-module/stm-masters/chambers-master/chambers-master-update-create/chambers-master-update-create.component';
import { ChambersMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/chambers-master/chambers-master-create-update/chambers-master-create-update.component';

// import { SharedModule } from './common/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LovDialogComponent,
    MessageDialogComponent,
    NciReviewDetailComponent,
    DropdownListComponent,
    ActionAttachmentsListComponent,
    MessageDialogComponent, 
   
    
   





  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    SharedModule

    //MatDialogModule,

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
