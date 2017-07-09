import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { DataTableModule, GrowlModule,SharedModule,Message,DialogModule} from 'primeng/primeng';
import { AnalyticsService } from '../analytics/analytics.service';
import { DashboardComponent } from './dashboard.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ButtonModule } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from "primeng/primeng";

@NgModule({
    declarations:[DashboardComponent],
    imports: 
        [
            DataTableModule, 
            SharedModule,
            CommonModule,
            MaterialModule.forRoot(),
            GrowlModule,
            DialogModule,
            Ng2GoogleChartsModule,
            ButtonModule,
            ContextMenuModule
        ],
    providers: [AnalyticsService]
})
export class DashboardModule { }