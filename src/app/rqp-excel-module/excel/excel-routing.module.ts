import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  PreloadingStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { EsInitiatorComponent } from '../es/es-initiator/es-initiator.component';
import { EsUpdateComponent } from '../es/es-update/es-update.component';
import { EsReviewerComponent } from '../es/es-reviewer/es-reviewer.component';
import { EsUpdateSaveComponent } from '../es/es-update-save/es-update-save.component';
import { EsReviewerSaveComponent } from '../es/es-reviewer-save/es-reviewer-save.component';
import { EsHomeComponent } from '../es/es-home/es-home.component';
import { RasiInitComponent } from '../raw-material-assay/rasi-init/rasi-init.component';
import { RasiHomeComponent } from '../raw-material-assay/rasi-home/rasi-home.component';
import { RasiUpdateComponent } from '../raw-material-assay/rasi-update/rasi-update.component';
import { RasiReviewerComponent } from '../raw-material-assay/rasi-reviewer/rasi-reviewer.component';
import { RasiUpateSaveComponent } from '../raw-material-assay/rasi-upate-save/rasi-upate-save.component';
 import { Fas1InitiatorComponent } from '../finished-product-assay/fas1-initiator/fas1-initiator.component';
 import { Fas1HomeComponent } from '../finished-product-assay/fas1-home/fas1-home.component';
// import { ExcelLwDashBoardComponent } from '../excel-lw-dash-board/excel-lw-dash-board.component';
import { ExcelCompletedComponent } from '../excel-completed/excel-completed.component';
import { ExcelCompletedSaveComponent } from '../excel-completed-save/excel-completed-save.component';
 import { RasiReviewerSaveComponent } from '../raw-material-assay/rasi-reviewer-save/rasi-reviewer-save.component';
 import { Fas1UpdateComponent } from '../finished-product-assay/fas1-update/fas1-update.component';
 import { Fas1UpdateSaveComponent } from '../finished-product-assay/fas1-update-save/fas1-update-save.component';
import { Fas1ReviewerComponent } from '../finished-product-assay/fas1-reviewer/fas1-reviewer.component';
 import { Fas1ReviewerSaveComponent } from '../finished-product-assay/fas1-reviewer-save/fas1-reviewer-save.component';
 import { Fas1CompletedComponent } from '../fas1-completed/fas1-completed.component';
 import { Fas1CompletedSaveComponent } from '../fas1-completed-save/fas1-completed-save.component';
import { Ras2HomeComponent } from '../ras2/ras2-home/ras2-home.component';
import { Ras2InitComponent } from '../ras2/ras2-init/ras2-init.component';
import { Ras2UpdateComponent } from '../ras2/ras2-update/ras2-update.component';
import { Ras2UpdateSaveComponent } from '../ras2/ras2-update-save/ras2-update-save.component';
import { Ras2ReviewerComponent } from '../ras2/ras2-reviewer/ras2-reviewer.component';
import { Ras2ReviewerSaveComponent } from '../ras2/ras2-reviewer-save/ras2-reviewer-save.component';
import { MrsleHomeComponent } from '../mrsle/mrsle-home/mrsle-home.component';
import { MrsleInitComponent } from '../mrsle/mrsle-init/mrsle-init.component';
import { MrsleReviewerSaveComponent } from '../mrsle/mrsle-reviewer-save/mrsle-reviewer-save.component';
import { MrsleReviewerComponent } from '../mrsle/mrsle-reviewer/mrsle-reviewer.component';
import { MrsleUpdateSaveComponent } from '../mrsle/mrsle-update-save/mrsle-update-save.component';
import { MrsleUpdateComponent } from '../mrsle/mrsle-update/mrsle-update.component';
import { MrsfdHomeComponent } from '../mrsfd/mrsfd-home/mrsfd-home.component';
import { MrsfdInitComponent } from '../mrsfd/mrsfd-init/mrsfd-init.component';
import { MrsfdReviewerSaveComponent } from '../mrsfd/mrsfd-reviewer-save/mrsfd-reviewer-save.component';
import { MrsfdReviewerComponent } from '../mrsfd/mrsfd-reviewer/mrsfd-reviewer.component';
import { MrsfdUpdateSaveComponent } from '../mrsfd/mrsfd-update-save/mrsfd-update-save.component';
import { MrsfdUpdateComponent } from '../mrsfd/mrsfd-update/mrsfd-update.component';
import { MrsssHomeComponent } from '../mrsss/mrsss-home/mrsss-home.component';
import { MrsssInitComponent } from '../mrsss/mrsss-init/mrsss-init.component';
import { MrsssReviewerSaveComponent } from '../mrsss/mrsss-reviewer-save/mrsss-reviewer-save.component';
import { MrsssReviewerComponent } from '../mrsss/mrsss-reviewer/mrsss-reviewer.component';
import { MrsssUpdateSaveComponent } from '../mrsss/mrsss-update-save/mrsss-update-save.component';
import { MrsssUpdateComponent } from '../mrsss/mrsss-update/mrsss-update.component';
import { MrsleCompletedComponent } from '../mrsle/mrsle-completed/mrsle-completed.component';
import { MrsleCompletedSaveComponent } from '../mrsle/mrsle-completed-save/mrsle-completed-save.component';
import { MrsaHomeComponent } from '../mrsa/mrsa-home/mrsa-home.component';
import { MrsaInitComponent } from '../mrsa/mrsa-init/mrsa-init.component';
import { MrsaReviewerSaveComponent } from '../mrsa/mrsa-reviewer-save/mrsa-reviewer-save.component';
import { MrsaReviewerComponent } from '../mrsa/mrsa-reviewer/mrsa-reviewer.component';
import { MrsaUpdateSaveComponent } from '../mrsa/mrsa-update-save/mrsa-update-save.component';
import { MrsaUpdateComponent } from '../mrsa/mrsa-update/mrsa-update.component';
import { MrsmpHomeComponent } from '../mrsmp/mrsmp-home/mrsmp-home.component';
import { MrsmpInitComponent } from '../mrsmp/mrsmp-init/mrsmp-init.component';
import { MrsmpReviewerSaveComponent } from '../mrsmp/mrsmp-reviewer-save/mrsmp-reviewer-save.component';
import { MrsmpReviewerComponent } from '../mrsmp/mrsmp-reviewer/mrsmp-reviewer.component';
import { MrsmpUpdateSaveComponent } from '../mrsmp/mrsmp-update-save/mrsmp-update-save.component';
import { MrsmpUpdateComponent } from '../mrsmp/mrsmp-update/mrsmp-update.component';
import { MrssstInitComponent } from '../mrssst/mrssst-init/mrssst-init.component';
import { MrssstHomeComponent } from '../mrssst/mrssst-home/mrssst-home.component';
import { MrssstUpdateComponent } from '../mrssst/mrssst-update/mrssst-update.component';
import { MrssstUpdateSaveComponent } from '../mrssst/mrssst-update-save/mrssst-update-save.component';
import { MrssstReviewerComponent } from '../mrssst/mrssst-reviewer/mrssst-reviewer.component';
import { MrssstReviewerSaveComponent } from '../mrssst/mrssst-reviewer-save/mrssst-reviewer-save.component';

 const routes: Routes = [
  {
    path: 'es-home',
    component: EsHomeComponent,
  },
  {
    path: 'es-init',
    component: EsInitiatorComponent,
  },
  {
    path: 'es-update',
    component: EsUpdateComponent,
  },
  {
    path: 'es-update-save',
    component: EsUpdateSaveComponent,
  },
  {
    path: 'es-reviewer',
    component: EsReviewerComponent,
  },
  {
    path: 'es-reviewer-save',
    component: EsReviewerSaveComponent,
  },
//   {
//     path: 'excel-lw-dash-board',
//     component: ExcelLwDashBoardComponent,
//   },
  {
    path: 'excel-completed',
    component:ExcelCompletedComponent,
  },
  {
    path: 'excel-completed-save',
    component: ExcelCompletedSaveComponent,
  },
  {
    path: 'rasi-home',
    component: RasiHomeComponent,
  },
  {
    path: 'rasi-init',
    component: RasiInitComponent,
  },
  {
    path: 'rasi-update',
    component: RasiUpdateComponent,
  },
  {
    path: 'rasi-update-save',
    component: RasiUpateSaveComponent,
  },
  {
    path: 'rasi-reviewer',
    component: RasiReviewerComponent,
  },
  {
    path: 'rasi-reviewer-save',
    component: RasiReviewerSaveComponent,
  },
   {
    path: 'fas1-home',
    component: Fas1HomeComponent,
  },
  {
    path: 'fas1-initiator',
    component: Fas1InitiatorComponent,
  },
  {
    path: 'fas1-update',
    component: Fas1UpdateComponent,
  },
  {
    path: 'fas1-update-save',
    component: Fas1UpdateSaveComponent,
  },
  {
    path: 'fas1-reviewer',
    component: Fas1ReviewerComponent,
  },
  {
    path: 'fas1-reviewer-save',
    component: Fas1ReviewerSaveComponent,
  },
  {
    path: 'fas1-completed',
    component:Fas1CompletedComponent,
  },
  {
    path: 'fas1-completed-save',
    component: Fas1CompletedSaveComponent,
  },
  {
    path: 'ras2-home',
    component: Ras2HomeComponent,
  },
  {
    path: 'ras2-init',
    component: Ras2InitComponent,
  },
  {
    path: 'ras2-update',
    component: Ras2UpdateComponent,
  },
  {
    path: 'ras2-update-save',
    component: Ras2UpdateSaveComponent,
  },
  {
    path: 'ras2-reviewer',
    component: Ras2ReviewerComponent,
  },
  {
    path: 'ras2-reviewer-save',
    component: Ras2ReviewerSaveComponent,
  },
  {
    path: 'mrsle-home',
    component:  MrsleHomeComponent,
  },
  {
    path: 'mrsle-init',
    component:  MrsleInitComponent,
  },
  {
    path: 'mrsle-update',
    component:MrsleUpdateComponent,
  },
  {
    path: 'mrsle-update-save',
    component:  MrsleUpdateSaveComponent,
  },
  {
    path: 'mrsle-reviewer',
    component:  MrsleReviewerComponent,
  },
  {
    path: 'mrsle-reviewer-save',
    component:  MrsleReviewerSaveComponent,
  },
  {
    path: 'mrsle-completed',
    component:MrsleCompletedComponent,
  },
  {
    path: 'mrsle-completed-save',
    component: MrsleCompletedSaveComponent,
  },
  {
    path: 'mrssst-home',
    component:  MrssstHomeComponent,
  },
  {
    path: 'mrssst-init',
    component:  MrssstInitComponent,
  },
  {
    path: 'mrssst-update',
    component:MrssstUpdateComponent,
  },
  {
    path: 'mrssst-update-save',
    component:  MrssstUpdateSaveComponent,
  },
  {
    path: 'mrssst-reviewer',
    component:  MrssstReviewerComponent,
  },
  {
    path: 'mrssst-reviewer-save',
    component:  MrssstReviewerSaveComponent,
  },
  {
    path: 'mrsfd-home',
    component:  MrsfdHomeComponent,
  },
  {
    path: 'mrsfd-init',
    component: MrsfdInitComponent,
  },
  {
    path: 'mrsfd-update',
    component:MrsfdUpdateComponent,
  },
  {
    path: 'mrsfd-update-save',
    component:  MrsfdUpdateSaveComponent,
  },
  {
    path: 'mrsfd-reviewer',
    component:  MrsfdReviewerComponent,
  },
  {
    path: 'mrsfd-reviewer-save',
    component:  MrsfdReviewerSaveComponent,
  },
  {
    path: 'mrsss-home',
    component:   MrsssHomeComponent,
  },
  {
    path: 'mrsss-init',
    component:  MrsssInitComponent,
  },
  {
    path: 'mrsss-update',
    component: MrsssUpdateComponent,
  },
  {
    path: 'mrsss-update-save',
    component:   MrsssUpdateSaveComponent,
  },
  {
    path: 'mrsss-reviewer',
    component:  MrsssReviewerComponent,
  },
  {
    path: 'mrsss-reviewer-save',
    component:   MrsssReviewerSaveComponent,
   },
  {
    path: 'mrsmp-home',
    component:   MrsmpHomeComponent,
  },
  {
    path: 'mrsmp-init',
    component:  MrsmpInitComponent,
  },
  {
    path: 'mrsmp-update',
    component: MrsmpUpdateComponent,
  },
  {
    path: 'mrsmp-update-save',
    component:   MrsmpUpdateSaveComponent,
  },
  {
    path: 'mrsmp-reviewer',
    component:  MrsmpReviewerComponent,
  },
  {
    path: 'mrsmp-reviewer-save',
    component:   MrsmpReviewerSaveComponent,
  },
  {
    path: 'mrsa-home',
    component:    MrsaHomeComponent,
  },
  {
    path: 'mrsa-init',
    component:  MrsaInitComponent,
  },
  {
    path: 'mrsa-update',
    component:  MrsaUpdateComponent,
  },
  {
    path: 'mrsa-update-save',
    component:   MrsaUpdateSaveComponent,
  },
  {
    path: 'mrsa-reviewer',
    component:  MrsaReviewerComponent,
  },
  {
    path: 'mrsa-reviewer-save',
    component:   MrsaReviewerSaveComponent,
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelRoutingModule {}
