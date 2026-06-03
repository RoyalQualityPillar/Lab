import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimsRoutingModule } from './lims-routing.module';
//import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
// import { CustomDatePipe } from 'src/app/common/pipe/custom-date.pipe';
// import { DocumentListComponent } from '../topic-registration/document-list/document-list.component';
// import { CourseSessionHomeComponent } from '../course-session/course-session-home/course-session-home.component';
// import { CourseSessionInitiatorComponent } from '../course-session/course-session-initiator/course-session-initiator.component';
// import { CourseSessionUpdateComponent } from '../course-session/course-session-update/course-session-update.component';
// import { CourseSessionUpdateSaveComponent } from '../course-session/course-session-update-save/course-session-update-save.component';
// import { TopicRegistrationHomeComponent } from '../topic-registration/topic-registration-home/topic-registration-home.component';
// import { TopicRegistrationInitComponent } from '../topic-registration/topic-registration-init/topic-registration-init.component';
// import { CourseHomeComponent } from '../course/course-home/course-home.component';
// import { TopicListComponent } from '../course/topic-list/topic-list.component';
// import { CourseInitiatorComponent } from '../course/course-initiator/course-initiator.component';
// import { CourseReviewerSaveComponent } from '../course/course-reviewer-save/course-reviewer-save.component';
// import { CourseReviewerComponent } from '../course/course-reviewer/course-reviewer.component';
// import { CourseUpdateComponent } from '../course/course-update/course-update.component';
// import { CourseUpdateSaveComponent } from '../course/course-update-save/course-update-save.component';
// import { TopicRegistrationUpdateComponent } from '../topic-registration/topic-registration-update/topic-registration-update.component';
// import { TopicRegistrationUpdateSaveComponent } from '../topic-registration/topic-registration-update-save/topic-registration-update-save.component';
// import { TopicRegistrationReviewerComponent } from '../topic-registration/topic-registration-reviewer/topic-registration-reviewer.component';
// import { TopicRegistrationReviewerSaveComponent } from '../topic-registration/topic-registration-reviewer-save/topic-registration-reviewer-save.component';
// import { CourseSessionReviewerComponent } from '../course-session/course-session-reviewer/course-session-reviewer.component';
// import { CourseSessionReviewerSaveComponent } from '../course-session/course-session-reviewer-save/course-session-reviewer-save.component';
// import { MatTableModule } from '@angular/material/table';
// import { TrainingScheduleInitiatorComponent } from '../training-schedule/training-schedule-initiator/training-schedule-initiator.component';
// import { TrainingScheduleHomeComponent } from '../training-schedule/training-schedule-home/training-schedule-home.component';
// import { TrainingScheduleReviewerComponent } from '../training-schedule/training-schedule-reviewer/training-schedule-reviewer.component';
// import { TrainingScheduleReviewerSaveComponent } from '../training-schedule/training-schedule-reviewer-save/training-schedule-reviewer-save.component';
// import { TrainingScheduleUpdateComponent } from '../training-schedule/training-schedule-update/training-schedule-update.component';
// import { TrainingScheduleUpdateSaveComponent } from '../training-schedule/training-schedule-update-save/training-schedule-update-save.component';
// import { TopicRegistrationCompletedComponent } from '../topic-registration/topic-registration-completed/topic-registration-completed.component';
// import { TopicRegistrationCompletedSaveComponent } from '../topic-registration/topic-registration-completed-save/topic-registration-completed-save.component';
// import { CourseCompletedComponent } from '../course/course-completed/course-completed.component';
// import { CourseCompletedSaveComponent } from '../course/course-completed-save/course-completed-save.component';
// import { CourseSessionCompletedComponent } from '../course-session/course-session-completed/course-session-completed.component';
// import { CourseSessionCompletedSaveComponent } from '../course-session/course-session-completed-save/course-session-completed-save.component';
// import { TestRegistrationHomePageComponent } from '../test-registration/test-registration-home-page/test-registration-home-page.component';
// import { TestRegistrationInitiatorComponent } from '../test-registration/test-registration-initiator/test-registration-initiator.component';
// import { TestRegistrationReviewComponent } from '../test-registration/test-registration-review/test-registration-review.component';
// import { TestRegistrationReviewSaveComponent } from '../test-registration/test-registration-review-save/test-registration-review-save.component';
// import { TestRegistrationUpdateComponent } from '../test-registration/test-registration-update/test-registration-update.component';
// import { TestRegistrationUpdateSaveComponent } from '../test-registration/test-registration-update-save/test-registration-update-save.component';
// import { WsrHomeComponent } from '../wsr/wsr-home/wsr-home.component';
// import { WsrInitiatorComponent } from '../wsr/wsr-initiator/wsr-initiator.component';
// import { WsrReviewerComponent } from '../wsr/wsr-reviewer/wsr-reviewer.component';
// import { WsrReviewerSaveComponent } from '../wsr/wsr-reviewer-save/wsr-reviewer-save.component';
// import { WsrUpdateComponent } from '../wsr/wsr-update/wsr-update.component';
// import { WsrUpdateSaveComponent } from '../wsr/wsr-update-save/wsr-update-save.component';
import { InstrumentCatCreateUpdateComponent } from '../masterdata/ims-masterdata/instrument-cat-create-update/instrument-cat-create-update.component';
import { InstrumentCatHomePageComponent } from '../masterdata/ims-masterdata/instrument-cat-home-page/instrument-cat-home-page.component';
import { CalibrationSchCreateUpdateComponent } from '../masterdata/ims-masterdata/calibration-sch-create-update/calibration-sch-create-update.component';
import { CalibrationFreqHomePageComponent } from '../masterdata/ims-masterdata/calibration-freq-home-page/calibration-freq-home-page.component';
import { CalibrationFreqCreateUpdateComponent } from '../masterdata/ims-masterdata/calibration-freq-create-update/calibration-freq-create-update.component';
import { CalibrationSchHomePageComponent } from '../masterdata/ims-masterdata/calibration-sch-home-page/calibration-sch-home-page.component';
import { ImsMasterDataHomePageComponent } from '../masterdata/ims-masterdata/ims-master-data-home-page/ims-master-data-home-page.component';
import { ImsMasterHomePageComponent } from '../masterdata/ims-master-home-page/ims-master-home-page.component';
import { CalibrationRecSchCreateUpdateComponent } from '../masterdata/ims-masterdata/calibration-rec-sch-create-update/calibration-rec-sch-create-update.component';
import { CalibrationRecSchHomePageComponent } from '../masterdata/ims-masterdata/calibration-rec-sch-home-page/calibration-rec-sch-home-page.component';
import { InstrumentMasterHomePageComponent } from '../masterdata/ims-masterdata/instrument-master-home-page/instrument-master-home-page.component';
import { InstrumentMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/instrument-master-create-update/instrument-master-create-update.component';
import { SampleSetMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/sample-set-master/sample-set-master-create-update/sample-set-master-create-update.component';
import { SampleSetMasterHomePageComponent } from '../masterdata/ims-masterdata/sample-set-master/sample-set-master-home-page/sample-set-master-home-page.component';
import { SampleRunMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/sample-run-master/sample-run-master-create-update/sample-run-master-create-update.component';
import { SampleRunMasterHomePageComponent } from '../masterdata/ims-masterdata/sample-run-master/sample-run-master-home-page/sample-run-master-home-page.component';
import { MethodMasterHomePageComponent } from '../masterdata/ims-masterdata/method-master/method-master-home-page/method-master-home-page.component';
import { MethodMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/method-master/method-master-create-update/method-master-create-update.component';
import { UserMasterHomePageComponent } from '../masterdata/ims-masterdata/user-master/user-master-home-page/user-master-home-page.component';
import { UserMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/user-master/user-master-create-update/user-master-create-update.component';
import { EvenLogMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/even-log-master/even-log-master-create-update/even-log-master-create-update.component';
import { EvenLogMasterHomePageComponent } from '../masterdata/ims-masterdata/even-log-master/even-log-master-home-page/even-log-master-home-page.component';
import { MatTableModule } from '@angular/material/table';
import { CaInitiatorComponent } from '../cm/ca/ca-initiator/ca-initiator.component';
import { CaHomeComponent } from '../cm/ca/ca-home/ca-home.component';
import { CqHomeComponent } from '../cm/cq/cq-home/cq-home.component';
import { CuHomeComponent } from '../cm/cu/cu-home/cu-home.component';
import { CmInitiatorComponent } from '../cm/cm/cm-initiator/cm-initiator.component';
//import { CaUpdateComponent } from '../cm/ca/ca-update/ca-update.component';
import { PmsListComponent } from '../pms-list/pms-list.component';
import { CreateUpdateInstrumentStatusComponent } from '../masterdata/ims-masterdata/instrument-status-master/create-update-instrument-status/create-update-instrument-status.component';
import { HomePageInstrumentStatusComponent } from '../masterdata/ims-masterdata/instrument-status-master/home-page-instrument-status/home-page-instrument-status.component';
import { IsmHomeComponent } from './ism-home/ism-home.component';
import { IsmInitiatorComponent } from './ism-initiator/ism-initiator.component';


@NgModule({
  declarations: [
    // DocumentListComponent,
    // CourseSessionHomeComponent,
    // CourseSessionInitiatorComponent,
    // CourseSessionUpdateComponent,
    // CourseSessionUpdateSaveComponent,
    // CourseSessionReviewerComponent,
    // CourseSessionReviewerSaveComponent,
    // CourseSessionCompletedComponent,
    // CourseSessionCompletedSaveComponent,
    // TopicRegistrationCompletedComponent,
    // TopicRegistrationCompletedSaveComponent,
    // TopicRegistrationHomeComponent,
    // TopicRegistrationInitComponent,
    // TopicRegistrationUpdateComponent,
    // TopicRegistrationUpdateSaveComponent,
    // TopicRegistrationReviewerComponent,
    // TopicRegistrationReviewerSaveComponent,
    // TrainingScheduleInitiatorComponent,
    // TrainingScheduleHomeComponent,
    // TrainingScheduleReviewerComponent,
    // TrainingScheduleReviewerSaveComponent,
    // TrainingScheduleUpdateComponent,
    // TrainingScheduleUpdateSaveComponent,
    // CourseHomeComponent,
    // TopicListComponent,
    // CourseInitiatorComponent,
    // CourseUpdateSaveComponent,
    // CourseUpdateComponent,
    // CourseReviewerComponent,
    // CourseReviewerSaveComponent,
    // CourseCompletedComponent,
    // CourseCompletedSaveComponent,
    // TestRegistrationHomePageComponent,
    // TestRegistrationInitiatorComponent,
    // TestRegistrationReviewComponent,
    // TestRegistrationReviewSaveComponent,
    // TestRegistrationUpdateComponent,
    // TestRegistrationUpdateSaveComponent,
    // WsrHomeComponent,
    // WsrInitiatorComponent,
    // WsrReviewerComponent,
    // WsrReviewerSaveComponent,
    // WsrUpdateComponent,
    // WsrUpdateSaveComponent,
    InstrumentCatCreateUpdateComponent,
    InstrumentCatHomePageComponent,
    CalibrationSchCreateUpdateComponent,
    CalibrationFreqHomePageComponent,
    CalibrationFreqCreateUpdateComponent,
    CalibrationSchHomePageComponent,
    ImsMasterDataHomePageComponent,
    ImsMasterHomePageComponent,
    CalibrationRecSchHomePageComponent,
    CalibrationRecSchCreateUpdateComponent,
    InstrumentMasterHomePageComponent,
    InstrumentMasterCreateUpdateComponent,
    SampleSetMasterCreateUpdateComponent,
    SampleSetMasterHomePageComponent,
    SampleRunMasterCreateUpdateComponent,
    SampleRunMasterHomePageComponent,
    MethodMasterCreateUpdateComponent,
    MethodMasterHomePageComponent,
    UserMasterCreateUpdateComponent,
    UserMasterHomePageComponent,
    EvenLogMasterCreateUpdateComponent,
    EvenLogMasterHomePageComponent,
    CmInitiatorComponent,
    CaHomeComponent,
    CaInitiatorComponent,
    CqHomeComponent,
    CuHomeComponent,
    EvenLogMasterHomePageComponent,   
    PmsListComponent,
    CreateUpdateInstrumentStatusComponent,
    HomePageInstrumentStatusComponent,
    IsmHomeComponent,
    IsmInitiatorComponent,

  ],
  imports: [
    CommonModule,
    LimsRoutingModule,
    //NgxSummernoteModule.forRoot(),
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
  ],
})
export class LimsModule { }
