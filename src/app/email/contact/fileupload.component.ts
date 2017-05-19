import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'upload',
    templateUrl: './fileupload.component.html',
	styleUrls: ['./fileupload.component.css']
              
})
export class FileUploadComponent {
    public uploader:FileUploader = new FileUploader({url:'contacts/bulkupload'});
}