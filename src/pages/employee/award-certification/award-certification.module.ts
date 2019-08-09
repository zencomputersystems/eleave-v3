import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerModule } from 'src/library/spinner/spinner.module';
import { AwardCertificationPage } from './award-certification.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';



const routes: Routes = [
    {
        path: '',
        component: AwardCertificationPage,
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatCardModule,
        InlineSVGModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        SpinnerModule,
        PdfViewerModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    declarations: [AwardCertificationPage]
})
export class AwardCertificationModule { }
