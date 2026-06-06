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
import { IsmCompletedComponent } from './rqp-lims-module/ism/ism-completed/ism-completed.component';
import { IsmCompletedSaveComponent } from './rqp-lims-module/ism/ism-completed-save/ism-completed-save.component';
import { IsmReviewerComponent } from './rqp-lims-module/ism/ism-reviewer/ism-reviewer.component';
import { IsmReviewerHomePageComponent } from './rqp-lims-module/ism/ism-reviewer-home-page/ism-reviewer-home-page.component';
import { IsmUpdateComponent } from './rqp-lims-module/ism/ism-update/ism-update.component';
import { IsmUpdateHomePageComponent } from './rqp-lims-module/ism/ism-update-home-page/ism-update-home-page.component';

import { NciReviewDetailComponent } from './rqp-qms-module/nci-review-detail/nci-review-detail.component';


// import { SharedModule } from './common/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    //CustomSnackBarComponent,
    LovDialogComponent,
    MessageDialogComponent,
    
    NciReviewDetailComponent,
          
   
   
   
    
    
    
    
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
