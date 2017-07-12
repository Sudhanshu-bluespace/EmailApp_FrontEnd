import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { GroupComponent } from './group/group.component';
import { ContactComponent } from './contact/contact.component';
import { FileUploadComponent } from './contact/fileupload.component';
import { EmailComponent } from './email/email.component';
import { EmailServerComponent } from './server/emailserver.component';
import { GroupService } from './group/group.service';
import { CommonService } from './shared/common.service';
import { ContactService } from './contact/contact.service';
import { ContactGroupService } from './contactgroup/contactgroup.service';
import { EmailServerService } from "./server/emailserver.service";
import { EmailService } from "./email/email.service";
import { EmailServerPropertiesService } from "./server/emailserverproperties.service";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { DataTableModule,EditorModule, SharedModule, GrowlModule, Message, 
         ButtonModule, Header, Footer, DialogModule, SelectItem,
         PanelModule, MultiSelectModule, ListboxModule, TabViewModule, DropdownModule} from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, FormsModule, EditorModule,HttpModule, JsonpModule, MaterialModule.forRoot(), DataTableModule, ButtonModule, 
    DialogModule, PanelModule, SharedModule, GrowlModule, MultiSelectModule, ListboxModule, TabViewModule, DropdownModule],
    declarations: [GroupComponent, ContactComponent, EmailServerComponent, EmailComponent, FileUploadComponent,	FileSelectDirective, FileDropDirective],
    providers: [ContactService, GroupService, CommonService, ContactGroupService, EmailServerService, EmailService,EmailServerPropertiesService]
})
export class EmailModule { }