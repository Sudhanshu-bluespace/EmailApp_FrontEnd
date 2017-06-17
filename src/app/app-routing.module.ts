import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { DefaultComponent } from './default';
import { LoginComponent } from './security/login';
import { DashboardComponent } from './dashboard';
import { UserRoleComponent } from './security/user-role';
import { UserGroupComponent } from './security/user-group';
import { UserAccountComponent } from './security/user-account';
import { GroupComponent } from './email/group/group.component';
import { ContactComponent } from './email/contact/contact.component';
import { EmailComponent } from './email/email/email.component';
import { EmailServerComponent } from './email/server/emailserver.component';
import {ChangePasswordComponent} from './security/change-password';
import {AnalyticsComponent} from './analytics/analytics.root.component';
import {FileUploadComponent} from './email/contact/fileupload.component';
import { RegistrationComponent } from './security/registration';
import { AccountApprovalComponent} from './security/account-approval/accountapproval.component';

const routes: Routes = [ 
  {path:'',component:DefaultComponent},
  {path:'send_email',component:EmailComponent},
  {path:'contacts',component:ContactComponent},
  {path:'groups',component:GroupComponent},
  {path:'servers',component:EmailServerComponent},
  {path:'user_roles',component:UserRoleComponent},
  {path:'user_accounts',component:UserAccountComponent},
  {path:'user_groups',component:UserGroupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'appLogin',component:LoginComponent},
  {path:'changePassword',component:ChangePasswordComponent},
  {path:'analytics',component:AnalyticsComponent},
  {path:'bulk_upload',component:FileUploadComponent},
  {path:'appRegister',component:RegistrationComponent},
  {path:'account_approval',component:AccountApprovalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmailAppRoutingModule { }
