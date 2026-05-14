import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimsSmRoutingModule } from './lims-sm-routing.module';
import { TestRegistrationHomePageComponent } from '../test-registration/test-registration-home-page/test-registration-home-page.component';
import { TestRegistrationInitiatorComponent } from '../test-registration/test-registration-initiator/test-registration-initiator.component';
import { TestRegistrationReviewComponent } from '../test-registration/test-registration-review/test-registration-review.component';
import { TestRegistrationReviewSaveComponent } from '../test-registration/test-registration-review-save/test-registration-review-save.component';
import { TestRegistrationUpdateComponent } from '../test-registration/test-registration-update/test-registration-update.component';
import { TestRegistrationUpdateSaveComponent } from '../test-registration/test-registration-update-save/test-registration-update-save.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/common/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { CustomDatePipe } from 'src/app/pipe/custom-date.pipe';
import { SpmModuleAdminComponent } from '../spm/spm-module-admin/spm-module-admin.component';
import { SpmInitiatorComponent } from '../spm/spm-initiator/spm-initiator.component';
import { SpmUpdateComponent } from '../spm/spm-update/spm-update.component';
import { SpmUpdateSaveComponent } from '../spm/spm-update-save/spm-update-save.component';
import { SpmReviewerSaveComponent } from '../spm/spm-reviewer-save/spm-reviewer-save.component';
import { SpmReviewerComponent } from '../spm/spm-reviewer/spm-reviewer.component';
import { SpmCompletedComponent } from '../spm/spm-completed/spm-completed.component';
import { SpmCompletedSaveComponent } from '../spm/spm-completed-save/spm-completed-save.component';
import { WsrHomeComponent } from '../wsr/wsr-home/wsr-home.component';
import { WsrInitiatorComponent } from '../wsr/wsr-initiator/wsr-initiator.component';
import { WsrReviewerComponent } from '../wsr/wsr-reviewer/wsr-reviewer.component';
import { WsrReviewerSaveComponent } from '../wsr/wsr-reviewer-save/wsr-reviewer-save.component';
import { WsrUpdateComponent } from '../wsr/wsr-update/wsr-update.component';
import { WsrUpdateSaveComponent } from '../wsr/wsr-update-save/wsr-update-save.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    TestRegistrationHomePageComponent,
    TestRegistrationInitiatorComponent,
    TestRegistrationReviewComponent,
    TestRegistrationReviewSaveComponent,
    TestRegistrationUpdateComponent,
    TestRegistrationUpdateSaveComponent,
    SpmModuleAdminComponent,
    SpmInitiatorComponent,
    SpmUpdateComponent,
    SpmUpdateSaveComponent,
    SpmReviewerSaveComponent,
    SpmReviewerComponent,
    SpmCompletedComponent,
    SpmCompletedSaveComponent,
    WsrHomeComponent,
    WsrInitiatorComponent,
    WsrReviewerComponent,
    WsrReviewerSaveComponent,
    WsrUpdateComponent,
    WsrUpdateSaveComponent,
  ],
  imports: [
    CommonModule,
    LimsSmRoutingModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    //  CKEditorModule,
    // CustomDatePipe,
  ]
})
export class LimsSmModule { }
