import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ImsMasterHomePageComponent } from '../masterdata/ims-master-home-page/ims-master-home-page.component';
import { CalibrationFreqCreateUpdateComponent } from '../masterdata/ims-masterdata/calibration-freq-create-update/calibration-freq-create-update.component';
import { CalibrationFreqHomePageComponent } from '../masterdata/ims-masterdata/calibration-freq-home-page/calibration-freq-home-page.component';
import { CalibrationSchCreateUpdateComponent } from '../masterdata/ims-masterdata/calibration-sch-create-update/calibration-sch-create-update.component';
import { CalibrationSchHomePageComponent } from '../masterdata/ims-masterdata/calibration-sch-home-page/calibration-sch-home-page.component';
import { ImsMasterDataHomePageComponent } from '../masterdata/ims-masterdata/ims-master-data-home-page/ims-master-data-home-page.component';
import { InstrumentCatCreateUpdateComponent } from '../masterdata/ims-masterdata/instrument-cat-create-update/instrument-cat-create-update.component';
import { InstrumentCatHomePageComponent } from '../masterdata/ims-masterdata/instrument-cat-home-page/instrument-cat-home-page.component';
import { CalibrationRecSchCreateUpdateComponent } from '../masterdata/ims-masterdata/calibration-rec-sch-create-update/calibration-rec-sch-create-update.component';
import { CalibrationRecSchHomePageComponent } from '../masterdata/ims-masterdata/calibration-rec-sch-home-page/calibration-rec-sch-home-page.component';
import { InstrumentMasterCreateUpdateComponent } from '../masterdata/ims-masterdata/instrument-master-create-update/instrument-master-create-update.component';
import { InstrumentMasterHomePageComponent } from '../masterdata/ims-masterdata/instrument-master-home-page/instrument-master-home-page.component';
import { SampleSetMasterHomePageComponent } from '../masterdata/ims-masterdata/sample-set-master/sample-set-master-home-page/sample-set-master-home-page.component';
import { SampleRunMasterHomePageComponent } from '../masterdata/ims-masterdata/sample-run-master/sample-run-master-home-page/sample-run-master-home-page.component';
import { MethodMasterHomePageComponent } from '../masterdata/ims-masterdata/method-master/method-master-home-page/method-master-home-page.component';
import { UserMasterHomePageComponent } from '../masterdata/ims-masterdata/user-master/user-master-home-page/user-master-home-page.component';
import { EvenLogMasterHomePageComponent } from '../masterdata/ims-masterdata/even-log-master/even-log-master-home-page/even-log-master-home-page.component';
import { ImsMasterHomePageComponent } from '../masterdata/ims-master-home-page/ims-master-home-page.component';
import { SpmInitiatorComponent } from '../spm/spm-initiator/spm-initiator.component';
import { SpmUpdateComponent } from '../spm/spm-update/spm-update.component';
import { SpmModuleAdminComponent } from '../spm/spm-module-admin/spm-module-admin.component';
import { SpmUpdateSaveComponent } from '../spm/spm-update-save/spm-update-save.component';
import { SpmReviewerSaveComponent } from '../spm/spm-reviewer-save/spm-reviewer-save.component';
import { SpmReviewerComponent } from '../spm/spm-reviewer/spm-reviewer.component';
import { SpmCompletedComponent } from '../spm/spm-completed/spm-completed.component';
import { SpmCompletedSaveComponent } from '../spm/spm-completed-save/spm-completed-save.component';
// import { LimsModuleHomePageComponent } from '../lims-module-home-page/lims-module-home-page.component';
// import { LimsMasterHomePageComponent } from '../lims-master/lims-master-home-page/lims-master-home-page.component';
// import { FieldActiveComponent } from '../lims-master/field-master/field-active/field-active.component';
// import { FieldHomePageComponent } from '../lims-master/field-master/field-home-page/field-home-page.component';
// import { GtpHomeComponent } from '../gtp/gtp-home/gtp-home.component';
// import { GtpInitComponent } from '../gtp/gtp-init/gtp-init.component';
// import { GtpUpdateComponent } from '../gtp/gtp-update/gtp-update.component';
// import { GtpUpdateSaveComponent } from '../gtp/gtp-update-save/gtp-update-save.component';
// import { GtpReviewerComponent } from '../gtp/gtp-reviewer/gtp-reviewer.component';
// import { GtpReviewerSaveComponent } from '../gtp/gtp-reviewer-save/gtp-reviewer-save.component';
// import { CourseSessionHomeComponent } from '../course-session/course-session-home/course-session-home.component';
// import { CourseSessionInitiatorComponent } from '../course-session/course-session-initiator/course-session-initiator.component';
// import { CourseSessionUpdateComponent } from '../course-session/course-session-update/course-session-update.component';
// import { CourseSessionUpdateSaveComponent } from '../course-session/course-session-update-save/course-session-update-save.component';
// import { CourseSessionReviewerComponent } from '../course-session/course-session-reviewer/course-session-reviewer.component';
// import { CourseSessionReviewerSaveComponent } from '../course-session/course-session-reviewer-save/course-session-reviewer-save.component';
// import { CourseHomeComponent } from '../course/course-home/course-home.component';
// import { CourseInitiatorComponent } from '../course/course-initiator/course-initiator.component';
// import { CourseUpdateComponent } from '../course/course-update/course-update.component';
// import { CourseUpdateSaveComponent } from '../course/course-update-save/course-update-save.component';
// import { CourseReviewerComponent } from '../course/course-reviewer/course-reviewer.component';
// import { CourseReviewerSaveComponent } from '../course/course-reviewer-save/course-reviewer-save.component';
// import { TopicRegistrationCompletedSaveComponent } from '../topic-registration/topic-registration-completed-save/topic-registration-completed-save.component';
// import { TopicRegistrationCompletedComponent } from '../topic-registration/topic-registration-completed/topic-registration-completed.component';

const routes: Routes = [
  // {
  //   path: 'lims-module-home-page',
  //   component: LimsModuleHomePageComponent,
  // },
  // {
  //   path: 'lims-master-home-page',
  //   component: LimsMasterHomePageComponent,
  // },
  // {
  //   path: 'wsr-home',
  //   component: WsrHomeComponent,
  // },
  // {
  //   path: 'wsr-init',
  //   component: WsrInitiatorComponent,
  // },
  // {
  //   path: 'wsr-update',
  //   component: WsrUpdateComponent,
  // },
  // {
  //   path: 'wsr-update-save',
  //   component: WsrUpdateSaveComponent,
  // },
  // {
  //   path: 'wsr-reviewer',
  //   component: WsrReviewerComponent,
  // },
  // {
  //   path: 'wsr-reviewer-save',
  //   component: WsrReviewerSaveComponent,
  // },
  // {
  //   path: 'field-home-page',
  //   component: FieldHomePageComponent,
  // },
  // {
  //   path: 'test-registration-home-page',
  //   component: TestRegistrationHomePageComponent,
  // },
  // {
  //   path: 'test-registration-initiator',
  //   component: TestRegistrationInitiatorComponent,
  // },
  // {
  //   path: 'test-registration-update',
  //   component: TestRegistrationUpdateComponent,
  // },
  // {
  //   path: 'test-registration-update-save',
  //   component: TestRegistrationUpdateSaveComponent,
  // },
  // {
  //   path: 'test-registration-reviewer',
  //   component: TestRegistrationReviewComponent,
  // },
  // {
  //   path: 'test-registration-reviewer-save',
  //   component: TestRegistrationReviewSaveComponent,
  // },
  // {
  //   path: 'topic-registration-home',
  //   component: TopicRegistrationHomeComponent,
  // },
  // {
  //   path: 'topic-registration-init',
  //   component: TopicRegistrationInitComponent,
  // },
  // {
  //   path: 'topic-registration-update',
  //   component: TopicRegistrationUpdateComponent,
  // },
  // {
  //   path: 'topic-registration-update-save',
  //   component: TopicRegistrationUpdateSaveComponent,
  // },
  // {
  //   path: 'topic-registration-reviewer',
  //   component: TopicRegistrationReviewerComponent,
  // },
  // {
  //   path: 'topic-registration-reviewer-save',
  //   component: TopicRegistrationReviewerSaveComponent,
  // },
  // {
  //   path: 'topic-registration-completed',
  //   component: TopicRegistrationCompletedComponent,
  // },
  // {
  //   path: 'topic-registration-completed-save',
  //   component: TopicRegistrationCompletedSaveComponent,
  // },
  // {
  //   path: 'training-schedule-home',
  //   component: TrainingScheduleHomeComponent,
  // },
  // {
  //   path: 'training-schedule-initiator',
  //   component: TrainingScheduleInitiatorComponent,
  // },
  // {
  //   path: 'training-schedule-update',
  //   component: TrainingScheduleUpdateComponent,
  // },
  // {
  //   path: 'training-schedule-update-save',
  //   component: TrainingScheduleUpdateSaveComponent,
  // },
  // {
  //   path: 'training-schedule-reviewer',
  //   component: TrainingScheduleReviewerComponent,
  // },
  // {
  //   path: 'training-schedule-reviewer-save',
  //   component: TrainingScheduleReviewerSaveComponent,
  // },
  // {
  //   path: 'course-session-home',
  //   component: CourseSessionHomeComponent,
  // },
  // {
  //   path: 'course-session-initiator',
  //   component: CourseSessionInitiatorComponent,
  // },
  // {
  //   path: 'course-session-update',
  //   component: CourseSessionUpdateComponent,
  // },
  // {
  //   path: 'course-session-update-save',
  //   component: CourseSessionUpdateSaveComponent,
  // },
  // {
  //   path: 'course-session-reviewer',
  //   component: CourseSessionReviewerComponent,
  // },
  // {
  //   path: 'course-session-reviewer-save',
  //   component: CourseSessionReviewerSaveComponent,
  // },
  // {
  //   path: 'course-session-completed',
  //   component: CourseSessionCompletedComponent,
  // },
  // {
  //   path: 'course-session-completed-save',
  //   component: CourseSessionCompletedSaveComponent,
  // },
  // {
  //   path: 'course-home',
  //   component: CourseHomeComponent,
  // },
  // {
  //   path: 'topic-list',
  //   component: TopicListComponent,
  // },
  // {
  //   path: 'course-initiator',
  //   component: CourseInitiatorComponent,
  // },
  // {
  //   path: 'course-update',
  //   component: CourseUpdateComponent,
  // },
  // {
  //   path: 'course-update-save',
  //   component: CourseUpdateSaveComponent,
  // },
  // {
  //   path: 'course-reviewer',
  //   component: CourseReviewerComponent,
  // },
  // {
  //   path: 'course-reviewer-save',
  //   component: CourseReviewerSaveComponent,
  // },
  // {
  //   path: 'course-completed',
  //   component: CourseCompletedComponent,
  // },
  // {
  //   path: 'course-completed-save',
  //   component: CourseCompletedSaveComponent,
  // },
  // {
  //   path: 'gtp-home',
  //   component: GtpHomeComponent,
  // },
  // {
  //   path: 'gtp-init',
  //   component: GtpInitComponent,
  // },
  // {
  //   path: 'gtp-update',
  //   component: GtpUpdateComponent,
  // },
  // {
  //   path: 'gtp-update-save',
  //   component: GtpUpdateSaveComponent,
  // },
  // {
  //   path: 'gtp-reviewer',
  //   component: GtpReviewerComponent,
  // },
  // {
  //   path: 'gtp-reviewer-save',
  //   component: GtpReviewerSaveComponent,
  // },
  {
    path: 'ims-master-home-page',
    component: ImsMasterHomePageComponent,
  },
  {
    path: 'ims-master-data-home-page',
    component: ImsMasterDataHomePageComponent,
  },
  {
    path: 'instrument-cat-home-page',
    component: InstrumentCatHomePageComponent,

  },
  {
    path: 'instrument-cat-create-update',
    component: InstrumentCatCreateUpdateComponent
    ,

  },
  {
    path: 'instrument-master-home-page',
    component: InstrumentMasterHomePageComponent,

  },
  {
    path: 'instrument-master-create-update',
    component: InstrumentMasterCreateUpdateComponent
    ,

  },

  {
    path: 'calibration-sch-home-page',
    component: CalibrationSchHomePageComponent,

  },
  {
    path: 'calibration-sch-create-update',
    component: CalibrationSchCreateUpdateComponent
    ,

  },
  {
    path: 'calibration-freq-home-page',
    component: CalibrationFreqHomePageComponent,

  },
  {
    path: 'calibration-freq-create-update',
    component: CalibrationFreqCreateUpdateComponent
    ,

  },
  {
    path: 'calibration-rec-sch-home-page',
    component: CalibrationRecSchHomePageComponent,

  },
  {
    path: 'calibration-rec-sch-create-update',
    component: CalibrationRecSchCreateUpdateComponent,
  },
  {
    path: 'sample-set-master-home-page',
    component: SampleSetMasterHomePageComponent,
  },
  {
    path: 'sample-run-master-home-page',
    component: SampleRunMasterHomePageComponent,
  },
  {
    path: 'method-master-home-page',
    component: MethodMasterHomePageComponent,
  },
  {
    path: 'user-master-home-page',
    component: UserMasterHomePageComponent,
  },
  {
    path: 'even-log-master-home-page',
    component: EvenLogMasterHomePageComponent,
  },
  {
    path: 'spm-module-admin',
    component: SpmModuleAdminComponent,
  },
  {
    path: 'spm-initiator',
    component: SpmInitiatorComponent,
  },
   {
    path: 'spm-update',
    component: SpmUpdateComponent,
  },
  {
    path: 'spm-update-save',
    component: SpmUpdateSaveComponent,
  },
  {
    path: 'spm-reviewer-save',
    component: SpmReviewerSaveComponent,
  },
  {
    path: 'spm-reviewer',
    component: SpmReviewerComponent,
  },
  {
    path: 'spm-completed',
    component: SpmCompletedComponent,
  },
  {
    path: 'spm-completed-save',
    component: SpmCompletedSaveComponent,
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimsRoutingModule { }
