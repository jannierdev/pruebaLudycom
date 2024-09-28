import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { UsersComponent } from './users/users.component';
import { AreasComponent } from './areas/areas.component';
import { ChartModule } from 'angular-highcharts';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        HomeRoutingModule,
        ChartModule
    ],
    declarations: [
        HomeComponent,
        UsersComponent,
        AreasComponent,
        DashboardComponent
    ]
})
export class HomeModule { }