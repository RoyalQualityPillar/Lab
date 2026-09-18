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
import { WsPeramentersHomePageComponent } from './rqp-lims-stm-module/stm-masters/ws-peramenters-master/ws-peramenters-home-page/ws-peramenters-home-page.component';
import { WsPeramentersCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/ws-peramenters-master/ws-peramenters-create-update/ws-peramenters-create-update.component';
import { WsTemplateIndexCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/ws-template-index/ws-template-index-create-update/ws-template-index-create-update.component';
import { WsTemplateIndexHomePageComponent } from './rqp-lims-stm-module/stm-masters/ws-template-index/ws-template-index-home-page/ws-template-index-home-page.component';
import { WsPeraamentersRecordHomePageComponent } from './rqp-lims-stm-module/stm-masters/ws-peraamenters-record/ws-peraamenters-record-home-page/ws-peraamenters-record-home-page.component';
import { WsPeraamentersRecordCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/ws-peraamenters-record/ws-peraamenters-record-create-update/ws-peraamenters-record-create-update.component';
import { WsStudyTypeHomePageComponent } from './rqp-lims-stm-module/stm-masters/study-type/ws-study-type-home-page/ws-study-type-home-page.component';
import { WsStudyTypeCreateUpdateComponent } from './rqp-lims-stm-module/stm-masters/study-type/ws-study-type-create-update/ws-study-type-create-update.component';

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
