import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleService } from './user-role/user-role.service';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupService } from './user-group/user-group.service';
import { UserAccountComponent } from './user-account/user-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountApprovalComponent } from './account-approval/accountapproval.component';
import { UserAccountService } from './user-account/user-account.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginService } from './login/login.service';
import { RegistrationService } from './registration/registration.service';
import {SelectModule} from 'ng2-select';
import { AccountApprovalService} from './account-approval/accountapproval.service';
import { DataTableModule, SharedModule, GrowlModule, Message, 
         ButtonModule, Header, Footer, DialogModule, SelectItem, PickListModule,
         PanelModule, MultiSelectModule, ListboxModule, TabViewModule, DropdownModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    UserRoleComponent,
    UserAccountComponent,
    UserGroupComponent,
    LoginComponent,
	  RegistrationComponent,
    AccountApprovalComponent,
    ChangePasswordComponent  
  ],
  imports: [
    CommonModule,
    FormsModule,HttpModule,JsonpModule,
    MaterialModule.forRoot(),
    SelectModule,
    DataTableModule, ButtonModule, PickListModule,
    DialogModule, PanelModule, SharedModule, GrowlModule, MultiSelectModule, ListboxModule, TabViewModule, DropdownModule
  ],
  providers: [UserRoleService,LoginService,RegistrationService,UserGroupService,UserAccountService,AccountApprovalService],
})
export class SecurityModule { }
