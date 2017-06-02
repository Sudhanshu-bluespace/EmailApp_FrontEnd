import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Message } from "../../message";

@Component({
    selector: 'upload',
    templateUrl: './fileupload.component.html',
	styleUrls: ['./fileupload.component.css']
              
})
export class FileUploadComponent {
    public uploader:FileUploader;
	msgs: Message[] = [];
	uploaded: boolean = false;
	
	constructor()
	{
			this.uploadContact();
			this.uploader.onCompleteItem = (item, response, status, header) => {
			  if (status === 200) {
				this.msgs.push({ severity: "info", summary: "Contacts uploaded successfully", detail: response });
                this.uploaded = false;
			  }
			  else
			  {
				this.msgs.push({ severity: "error", summary: "Upload failed", detail: response });
                this.uploaded = false; 
			  }				  
			}
	}
	
	uploadContact()
	{
		this.uploader = new FileUploader({url:'contacts/bulkupload'});
	}

	showDialog() 
	{
        this.uploaded = true;
    }
}