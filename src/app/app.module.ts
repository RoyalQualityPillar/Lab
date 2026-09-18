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
<<<<<<< HEAD
import { StudyTypeMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/study-type-master/study-type-master-create-update/study-type-master-create-update.component';
import { StudyTypeMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/study-type-master/study-type-master-home-page/study-type-master-home-page.component';
import { StorageConditioMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/storage-condition-master/storage-conditio-master-create-update/storage-conditio-master-create-update.component';
import { StorageConditioMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/storage-condition-master/storage-conditio-master-home-page/storage-conditio-master-home-page.component';
import { ChambersTypeMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/chambers-type-master/chambers-type-master-create-update/chambers-type-master-create-update.component';
import { ChambersTypeMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/chambers-type-master/chambers-type-master-home-page/chambers-type-master-home-page.component';
import { ChambersRacksMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/chambers-racks-master/chambers-racks-master-home-page/chambers-racks-master-home-page.component';
import { ChambersRacksMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/chambers-racks-master/chambers-racks-master-create-update/chambers-racks-master-create-update.component';
import { ChambersShellMasterCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/chambers-shell-master/chambers-shell-master-create-update/chambers-shell-master-create-update.component';
import { ChambersShellMasterHomePageComponent } from './rqp-lims-stm-module/stm-masters/chambers-shell-master/chambers-shell-master-home-page/chambers-shell-master-home-page.component';
import { StabilityProtRecCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/stability-protocol-record/stability-prot-rec-create-update/stability-prot-rec-create-update.component';
import { StabilityProtRecHomePageComponent } from './rqp-lims-stm-module/stm-masters/stability-protocol-record/stability-prot-rec-home-page/stability-prot-rec-home-page.component';
import { StabilityProtScheHomePageComponent } from './rqp-lims-stm-module/stm-masters/stability-protocol-schedule/stability-prot-sche-home-page/stability-prot-sche-home-page.component';
import { StabilityProtScheCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/stability-protocol-schedule/stability-prot-sche-create-update/stability-prot-sche-create-update.component';
import { StabilityProtScheRecHomePageComponent } from './rqp-lims-stm-module/stm-masters/stability-protocol-schedule-record/stability-prot-sche-rec-home-page/stability-prot-sche-rec-home-page.component';
import { StabilityProtScheRecCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/stability-protocol-schedule-record/stability-prot-sche-rec-create-update/stability-prot-sche-rec-create-update.component';
=======
import { WsPeramentersHomePageComponent } from './rqp-lims-stm-module/stm-masters/ws-peramenters-master/ws-peramenters-home-page/ws-peramenters-home-page.component';
import { WsPeramentersCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/ws-peramenters-master/ws-peramenters-create-update/ws-peramenters-create-update.component';
import { WsTemplateIndexCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/ws-template-index/ws-template-index-create-update/ws-template-index-create-update.component';
import { WsTemplateIndexHomePageComponent } from './rqp-lims-stm-module/stm-masters/ws-template-index/ws-template-index-home-page/ws-template-index-home-page.component';
import { WsPeraamentersRecordHomePageComponent } from './rqp-lims-stm-module/stm-masters/ws-peraamenters-record/ws-peraamenters-record-home-page/ws-peraamenters-record-home-page.component';
import { WsPeraamentersRecordCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/ws-peraamenters-record/ws-peraamenters-record-create-update/ws-peraamenters-record-create-update.component';
import { WsStudyTypeHomePageComponent } from './rqp-lims-stm-module/stm-masters/study-type/ws-study-type-home-page/ws-study-type-home-page.component';
import { WsStudyTypeCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/study-type/ws-study-type-create-update/ws-study-type-create-update.component';
>>>>>>> ba4e149242966e05cb8433efed5511b99a615203

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
<<<<<<< HEAD
    
    
=======
  
 
   
>>>>>>> ba4e149242966e05cb8433efed5511b99a615203

    

    
   



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
