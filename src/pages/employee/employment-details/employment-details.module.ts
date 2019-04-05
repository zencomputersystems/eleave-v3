import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import { EmploymentDetailsPage } from './employment-details.page';
import { InlineSVGModule } from 'ng-inline-svg';


const routes: Routes = [
    {
        path: '',
        component: EmploymentDetailsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatCardModule,
        InlineSVGModule,
        RouterModule.forChild(routes)
    ],
    declarations: [EmploymentDetailsPage]
})
export class EmploymentDetailsModule { }