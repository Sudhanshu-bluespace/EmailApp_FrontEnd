import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { EmailAppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
//import { FileUploadComponent } from './email/contact/fileupload.component';
import './rxjs-extensions';
import 'rxjs/Rx';
import { DefaultComponent } from './default/default.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { SecurityModule } from './security/security.module';
import { EmailModule } from './email/email.module';
import { DashboardModule } from './dashboard/dashboard.module';
import {GlobalService} from './core/global.service';
import {AuthorizationService} from './core/authorization.service';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {Tab} from './analytics/tab.component';
import {Tabs} from './analytics/tabs.component';
import {AnalyticsComponent} from './analytics/analytics.root.component';
import { Uploader } from 'angular2-http-file-upload';
//import { DataTableModule,SharedModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultComponent,
   // DashboardComponent,
	//FileUploadComponent,
	Tab,
	Tabs,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,JsonpModule,
    MaterialModule.forRoot(),
    EmailAppRoutingModule,
    SecurityModule,
    EmailModule,
    DashboardModule,
    //DataTableModule,SharedModule,
	  Ng2GoogleChartsModule
  ],
  providers: [GlobalService,AuthorizationService,Uploader],
  bootstrap: [AppComponent]
})
export class AppModule { }
