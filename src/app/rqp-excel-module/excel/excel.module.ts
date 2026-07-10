import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelRoutingModule } from './excel-routing.module';
import { EsInitiatorComponent } from '../es/es-initiator/es-initiator.component';
import { EsUpdateComponent } from '../es/es-update/es-update.component';
import { EsUpdateSaveComponent } from '../es/es-update-save/es-update-save.component';
import { EsReviewerComponent } from '../es/es-reviewer/es-reviewer.component';
import { EsReviewerSaveComponent } from '../es/es-reviewer-save/es-reviewer-save.component';
import { EsHomeComponent } from '../es/es-home/es-home.component';
// import { SharedModule } from 'src/app/common/shared.module';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RasiInitComponent } from '../raw-material-assay/rasi-init/rasi-init.component';
import { RasiHomeComponent } from '../raw-material-assay/rasi-home/rasi-home.component';
import { RasiUpdateComponent } from '../raw-material-assay/rasi-update/rasi-update.component';
import { RasiReviewerComponent } from '../raw-material-assay/rasi-reviewer/rasi-reviewer.component';
import { RasiUpateSaveComponent } from '../raw-material-assay/rasi-upate-save/rasi-upate-save.component';
import { Fas1InitiatorComponent } from '../finished-product-assay/fas1-initiator/fas1-initiator.component';
import { Fas1HomeComponent } from '../finished-product-assay/fas1-home/fas1-home.component';
import { SharedModule } from 'src/app/common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { ExcelLwDashBoardComponent } from '../excel-lw-dash-board/excel-lw-dash-board.component';
import { ExcelCompletedComponent } from '../excel-completed/excel-completed.component';
import { ExcelCompletedSaveComponent } from '../excel-completed-save/excel-completed-save.component';
// import { AsCommonFooterComponent } from '../as-common-footer/as-common-footer.component';
import { Fas1ReviewerComponent } from '../finished-product-assay/fas1-reviewer/fas1-reviewer.component';
import { Fas1ReviewerSaveComponent } from '../finished-product-assay/fas1-reviewer-save/fas1-reviewer-save.component';
import { Fas1UpdateComponent } from '../finished-product-assay/fas1-update/fas1-update.component';
import { Fas1UpdateSaveComponent } from '../finished-product-assay/fas1-update-save/fas1-update-save.component';
import { Fas1CompletedComponent } from '../fas1-completed/fas1-completed.component';
import { Fas1CompletedSaveComponent } from '../fas1-completed-save/fas1-completed-save.component';
import { Ras2HomeComponent } from '../ras2/ras2-home/ras2-home.component';
import { Ras2InitComponent } from '../ras2/ras2-init/ras2-init.component';
import { Ras2ReviewerComponent } from '../ras2/ras2-reviewer/ras2-reviewer.component';
import { Ras2ReviewerSaveComponent } from '../ras2/ras2-reviewer-save/ras2-reviewer-save.component';
import { Ras2UpdateSaveComponent } from '../ras2/ras2-update-save/ras2-update-save.component';
import { Ras2UpdateComponent } from '../ras2/ras2-update/ras2-update.component';
import { MrsleHomeComponent } from '../mrsle/mrsle-home/mrsle-home.component';
import { MrsleInitComponent } from '../mrsle/mrsle-init/mrsle-init.component';
import { MrsleReviewerSaveComponent } from '../mrsle/mrsle-reviewer-save/mrsle-reviewer-save.component';
import { MrsleReviewerComponent } from '../mrsle/mrsle-reviewer/mrsle-reviewer.component';
import { MrsleUpdateSaveComponent } from '../mrsle/mrsle-update-save/mrsle-update-save.component';
import { MrsleUpdateComponent } from '../mrsle/mrsle-update/mrsle-update.component';
import { MrssstHomeComponent } from '../mrssst/mrssst-home/mrssst-home.component';
import { MrssstInitComponent } from '../mrssst/mrssst-init/mrssst-init.component';
import { MrssstReviewerSaveComponent } from '../mrssst/mrssst-reviewer-save/mrssst-reviewer-save.component';
import { MrssstReviewerComponent } from '../mrssst/mrssst-reviewer/mrssst-reviewer.component';
import { MrssstUpdateSaveComponent } from '../mrssst/mrssst-update-save/mrssst-update-save.component';
import { MrssstUpdateComponent } from '../mrssst/mrssst-update/mrssst-update.component';
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
// import { NgApexchartsModule } from 'ng-apexcharts';
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
import { RasiReviewerSaveComponent } from '../raw-material-assay/rasi-reviewer-save/rasi-reviewer-save.component';
@NgModule({
    declarations: [
        EsHomeComponent,
        EsInitiatorComponent,
        EsUpdateComponent,
        EsUpdateSaveComponent,
        EsReviewerComponent,
        EsReviewerSaveComponent,
        RasiInitComponent,
        RasiHomeComponent,
        RasiUpdateComponent,
        RasiReviewerComponent,
        RasiReviewerSaveComponent,
        RasiUpateSaveComponent,
        Fas1HomeComponent,
        Fas1InitiatorComponent,
        //     ExcelLwDashBoardComponent,
        ExcelCompletedComponent,
        ExcelCompletedSaveComponent,
        //     AsCommonFooterComponent,
        Fas1UpdateComponent,
        Fas1UpdateSaveComponent,
        Fas1ReviewerComponent,
        Fas1ReviewerSaveComponent,
        Fas1CompletedComponent,
        Fas1CompletedSaveComponent,
        Ras2HomeComponent,
        Ras2InitComponent,
        Ras2ReviewerComponent,
        Ras2ReviewerSaveComponent,
        Ras2UpdateSaveComponent,
        Ras2UpdateComponent,
        MrsleHomeComponent,
        MrsleInitComponent,
        MrsleReviewerComponent,
        MrsleReviewerSaveComponent,
        MrsleUpdateSaveComponent,
        MrsleUpdateComponent,
        MrsleCompletedComponent,
        MrsleCompletedSaveComponent,
        MrssstHomeComponent,
        MrssstInitComponent,
        MrssstReviewerComponent,
        MrssstReviewerSaveComponent,
        MrssstUpdateSaveComponent,
        MrssstUpdateComponent,
        MrsfdHomeComponent,
        MrsfdInitComponent,
        MrsfdReviewerComponent,
        MrsfdReviewerSaveComponent,
        MrsfdUpdateSaveComponent,
        MrsfdUpdateComponent,
        MrsssHomeComponent,
        MrsssInitComponent,
        MrsssReviewerComponent,
        MrsssReviewerSaveComponent,
        MrsssUpdateSaveComponent,
        MrsssUpdateComponent,
        MrsmpHomeComponent,
        MrsmpInitComponent,
        MrsmpReviewerComponent,
        MrsmpReviewerSaveComponent,
        MrsmpUpdateSaveComponent,
        MrsmpUpdateComponent,
        MrsaHomeComponent,
        MrsaInitComponent,
        MrsaReviewerComponent,
        MrsaReviewerSaveComponent,
        MrsaUpdateSaveComponent,
        MrsaUpdateComponent,
    ], imports: [CommonModule,
        ExcelRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule,
        NgApexchartsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class ExcelModule { }
