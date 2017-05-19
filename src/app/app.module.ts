import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { EmailAppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import './rxjs-extensions';
import 'rxjs/Rx';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { SecurityModule } from './security/security.module';
import { EmailModule } from './email/email.module';
import {GlobalService} from './core/global.service';
import {AuthorizationService} from './core/authorization.service';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {Tab} from './analytics/tab.component';
import {Tabs} from './analytics/tabs.component';
import {AnalyticsComponent} from './analytics/analytics.root.component';
import { Uploader }      from 'angular2-http-file-upload';
import {FileUploadComponent} from './email/contact/fileupload.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { RegistrationComponent } from './security/registration';
//import {CarouselModule} from 'angular2-carousel-ztw/carousel.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultComponent,
    DashboardComponent,
	Tab,
	Tabs,
    AnalyticsComponent,
	FileUploadComponent,
	FileSelectDirective,
	RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,JsonpModule,
    MaterialModule.forRoot(),
    EmailAppRoutingModule,
    SecurityModule,
    EmailModule,
	Ng2GoogleChartsModule//,
	//CarouselModule
  ],
  providers: [GlobalService,AuthorizationService,Uploader],
  bootstrap: [AppComponent]
})
export class AppModule { }
