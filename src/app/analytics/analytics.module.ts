import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableModule, SharedModule} from 'primeng/primeng';

@NgModule({
    imports: [DataTableModule, SharedModule],
})
export class AnalyticsModule { }