import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
    declarations: [
        TableComponent,
        FormComponent,
        NavComponent,
        ChartComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ChartModule
    ],
    exports: [
        TableComponent,
        FormComponent,
        NavComponent,
        ChartComponent
    ]
})
export class SharedModule { }