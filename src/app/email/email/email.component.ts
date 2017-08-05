import { Component, OnInit } from "@angular/core";
import { Email } from "./email";
import { Group } from "../group/group";
import { CommonService } from "../shared/common.service";
import { GlobalService } from '../../core/global.service';
import { EmailService } from "./email.service";
import { Message } from "../../message";
import { EditorModule,SharedModule } from 'primeng/primeng';
import {Error} from './error';

@Component({
    templateUrl: "./email.component.html",
    styleUrls:["./table.min.css","./email.component.css"]
})
export class EmailComponent {
    emailVO = new Email();
    active: boolean = true;
    selectedGroups: Group[];
    msgs: Message[] = [];
    emailSending: boolean = false;

    constructor(private emailService: EmailService, private commonService: CommonService, private globalService:GlobalService) { }

    ngOnInit() {
        this.commonService.getAllGroups(this.globalService.loggedInUser.loggedInUserName);
    }

    test() {
        alert(this.selectedGroups.length);
    }

    sendEmail() {
        this.emailVO.groupIdList = [];
        for (let group of this.selectedGroups) {
            this.emailVO.groupIdList.push(group.id);
        }
        this.emailService.sendEmail(this.emailVO)
            .subscribe(() => {
                this.emailVO = new Email();
                this.selectedGroups;
                this.active = false;
                setTimeout(() => this.active = true, 0);
                this.msgs.push({ severity: "info", summary: "Email campaign triggered successully.", 
                    detail: "Based on the number of contacts targeted, the campaign might take longer to complete. Visit your dashboard to see the progress of the Jobs." });
                this.emailSending = false;
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email sending failed.", detail: error });
                this.emailSending = false;
            });
    }

    showDialog() {
        this.emailSending = true;
    }

    cancelClick() {
        this.emailVO = new Email();
    }

    public options: Object = 
    {
        placeholderText: 'Compose your email here!',
        charCounterCount: false,
        toolbarButtons:
        [
            'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertTable','insertFile', '|', 'specialCharacters', 'insertHR', 
            'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'
        ],
        fileUploadURL:'/emails/attachFile',
        fileUploadParams:
        {
            id:this.globalService.loggedInUser.loggedInUserName
        },
        imageUploadURL:'/emails/attachFile',
        imageUploadParams:
        {
            id:this.globalService.loggedInUser.loggedInUserName
        },
        imageUploadMethod:'PUT',
        fileUploadMethod: 'PUT',
        // Set max file size to 20MB.
        fileMaxSize: 20 * 1024 * 1024,
        // Allow to upload any file.
        fileAllowedTypes: ['*'],
        tableStyles: 
        {
            defaultBorderBackground:'Default'
        },
        events : 
        {
            'froalaEditor.file.error': function (e, editor, error, response)
            {
                let errorMsg = new Error();
                //console.log("Error during file upload : "+error.code+" | "+error.message);
                if(error.code === 5)
                {
                    error.message = "File exceeds max size limit of 20MB";
                    alert("File exceeds max size limit of 20MB");
                }
                else if(error.code === 3)
                {
                    error.message = response;
                    this.error = response;
                    
                    errorMsg = JSON.parse(response);
                    alert(errorMsg.error);
                }               
                
                return error;                
            }
        }
    }
}