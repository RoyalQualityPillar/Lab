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
import { CaHomeComponent } from '../cm/ca/ca-home/ca-home.component';
import { CaInitiatorComponent } from '../cm/ca/ca-initiator/ca-initiator.component';
import { CqHomeComponent } from '../cm/cq/cq-home/cq-home.component';
import { CuHomeComponent } from '../cm/cu/cu-home/cu-home.component';
import { CmInitiatorComponent } from '../cm/cm/cm-initiator/cm-initiator.component';
import { HomePageInstrumentStatusComponent } from '../masterdata/ims-masterdata/instrument-status-master/home-page-instrument-status/home-page-instrument-status.component';
import { IpmInitiatorComponent } from '../ipm/ipm-initiator/ipm-initiator.component';
import { IpmUpdateComponent } from '../ipm/ipm-update/ipm-update.component';
import { IpmUpdateSaveComponent } from '../ipm/ipm-update-save/ipm-update-save.component';
import { IpmReviewerComponent } from '../ipm/ipm-reviewer/ipm-reviewer.component';
import { IpmReviewerSaveComponent } from '../ipm/ipm-reviewer-save/ipm-reviewer-save.component';
import { CpmHomePageComponent } from '../masterdata/ims-masterdata/calibraion-perameter-master/cpm-home-page/cpm-home-page.component';
import { IsmHomeComponent } from '../ism/ism-home/ism-home.component';
import { IsmInitiatorComponent } from '../ism/ism-initiator/ism-initiator.component';
import { IsmCompletedComponent } from '../ism/ism-completed/ism-completed.component';
// import { IsmCompletedSaveComponent } from '../ism/ism-completed-save/ism-completed-save.component';
import { IsmReviewerComponent } from '../ism/ism-reviewer/ism-reviewer.component';
import { IsmReviewerHomePageComponent } from '../ism/ism-reviewer-home-page/ism-reviewer-home-page.component';
//import { IsmUpdateComponent } from '../ism/ism-update/ism-update.component';
import { IsmUpdateHomePageComponent } from '../ism/ism-update-home-page/ism-update-home-page.component';
import { IsmCompletedSaveComponent } from '../ism/ism-completed-save/ism-completed-save.component';
import { HomePagePrevntMainScheComponent } from '../masterdata/ims-masterdata/preventive-maintenance-schedule/home-page-prevnt-main-sche/home-page-prevnt-main-sche.component';
import { IpmHomeComponent } from '../ipm/ipm-home/ipm-home.component';
import { IpmCompletedComponent } from '../ipm/ipm-completed/ipm-completed.component';
import { IpmCompletedSaveComponent } from '../ipm/ipm-completed-save/ipm-completed-save.component';
import { IsmUpdateComponent } from '../ism/ism-update/ism-update.component';
import { CumHomePageComponent } from '../masterdata/ims-masterdata/calibraion-uom-master/cum-home-page/cum-home-page.component';
import { CalibrationScheduleMasterComponent } from '../masterdata/ims-masterdata/calibration-schedule-master/calibration-schedule-master.component';

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
    path: 'ca-home',
    component: CaHomeComponent,
  },
  {
    path: 'ca-initiator',
    component: CaInitiatorComponent,
  },
  {
    path: 'cq-home',
    component: CqHomeComponent,
  },
   {
    path: 'cu-home',
    component: CuHomeComponent,
  },
   {
    path: 'home-page-instrument-status',
    component: HomePageInstrumentStatusComponent,
  },
   {
    path: 'cpm-home-page',
    component: CpmHomePageComponent,
  },
   {
    path: 'ipm-initiator',
    component: IpmInitiatorComponent,
  },
   {
    path: 'ipm-update',
    component: IpmUpdateComponent,
  },
   {
    path: 'ipm-update-save',
    component: IpmUpdateSaveComponent,
  },
   {
    path: 'ipm-reviewer',
    component: IpmReviewerComponent,
  },
   {
    path: 'ipm-reviewer-save',
    component: IpmReviewerSaveComponent,
  },
 
  {
   path: 'ism-home',
    component: IsmHomeComponent,
  },
 
  
    {
    path: 'ism-initiator',
    component: IsmInitiatorComponent,
  },
   {
    path: 'ism-update',
    component: IsmUpdateComponent,
  },
   {
    path: 'ism-update-home-page',
    component: IsmUpdateHomePageComponent,
  },
   {
    path: 'ism-reviewer',
    component: IsmReviewerComponent,
  },
   {
    path: 'ism-reviewer-home-page',
    component: IsmReviewerHomePageComponent,
  },
 
  
   
  
  //  {
  //  path: 'ism-update',
  //   component: IsmUpdateComponent,
  // },
   {
   path: 'ism-update-home-page',
    component: IsmUpdateHomePageComponent,
   },

   {
  path: 'ism-completed',
  component: IsmCompletedComponent,
  },
  {
  path: 'ism-completed-save',
    component: IsmCompletedSaveComponent,
  },
  {
  path: 'home-page-prevnt-main-sche',
    component: HomePagePrevntMainScheComponent,
  },
  {
  path: 'ipm-home',
    component: IpmHomeComponent,
  },
  {
  path: 'ipm-completed',
    component: IpmCompletedComponent,
  },
  {
  path: 'ipm-completed-save',
    component: IpmCompletedSaveComponent,
  },
  {
  path: 'cum-home-page',
    component: CumHomePageComponent,
  },
  {
    path: 'calibration-schedule-master-page',
    component: CalibrationScheduleMasterComponent,
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimsRoutingModule { }
