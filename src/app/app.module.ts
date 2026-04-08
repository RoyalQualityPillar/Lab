import { NgModule } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BkTableModule } from 'bk-angular-table';
//import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LovDialogComponent } from './common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import { CaInitiatorComponent } from './rqp-lims-module/cm/ca/ca-initiator/ca-initiator.component';
import { CaHomeComponent } from './rqp-lims-module/cm/ca/ca-home/ca-home.component';
import { CqHomeComponent } from './rqp-lims-module/cm/cq/cq-home/cq-home.component';
import { CuHomeComponent } from './rqp-lims-module/cm/cu/cu-home/cu-home.component';
import { CmInitiatorComponent } from './rqp-lims-module/cm/cm/cm-initiator/cm-initiator.component';
//import { CaHomeComponent } from './rqp-lims-module/cm/cm/ca-home/ca-home.component';

//import { CaUpdateComponent } from './rqp-lims-module/cm/ca/ca-update/ca-update.component';


// import { SharedModule } from './common/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    //CustomSnackBarComponent,
    LovDialogComponent,
    MessageDialogComponent,
   
   
   
    
    

    
    
   
   
    
   
    
    
    
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
   BkTableModule,
  //  SharedModule
   
    //MatDialogModule,
    
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
