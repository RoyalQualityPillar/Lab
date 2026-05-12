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

<<<<<<< HEAD

=======
>>>>>>> f43fadeeb645314712060bad2f25104b12040f62
// import { SharedModule } from './common/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    //CustomSnackBarComponent,
    LovDialogComponent,
    MessageDialogComponent,
<<<<<<< HEAD
        
        

    
=======
  
   
 
   
>>>>>>> f43fadeeb645314712060bad2f25104b12040f62
    
    
   
   
  
   
   
   
   
    
   
    
    
    
    
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
