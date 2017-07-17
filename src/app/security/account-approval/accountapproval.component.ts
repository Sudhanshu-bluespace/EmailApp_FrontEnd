import { Component, OnInit } from '@angular/core';
import { AccountApprovalService } from "./accountapproval.service";
import { Message } from "../../message";
import { User } from '../model/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PendingAccountApprovals } from '../model/pendingaccountapprovals';
import { GlobalService } from '../../core/global.service';

@Component({
  selector: 'approval',
  templateUrl: './accountapproval.component.html',
  styleUrls: ['./accountapproval.component.css','../../email/contact/fileupload.component.css'],
  providers: [AccountApprovalService]
})
export class AccountApprovalComponent implements OnInit {

    pendingApprovals:PendingAccountApprovals[];
    userName:string;
    approved:boolean;
    msgs: Message[] = [];
    idToApprove:number;
    submitted:boolean;
    disabled:boolean;
    disabled_onhold:boolean;
    disabled_reject:boolean;
    noDataFound:boolean = false;
    request_type:string;
    //user:User;

    constructor( private router: Router,private accountAppovalService: AccountApprovalService,private globalService: GlobalService) 
    {
        if(sessionStorage.getItem("userLoggedIn")!=='true')
        {
            console.log("user not logged in.. routing to login");
            this.router.navigate(['/appLogin']);
        } 
        //console.log("activation approal component");
        this.userName = this.globalService.loggedInUser.loggedInUserName;
        //this.userName = this.user.loggedInUserName;
        //console.log("calling get pending approvals for "+this.userName);
        this.getPendingApprovals(this.userName);
    }


    ngOnInit() {
       // console.log('checking loggedin in init');
        if(sessionStorage.getItem("userLoggedIn")!=='true')
        {
            //console.log("[Init] - user not logged in.. routing to login");
            this.router.navigate(['/appLogin']);
        } 
    }

    onSubmit() {
        this.submitted = true;
        this.disabled = true;
        if(this.request_type === 'APPROVE')
        {
            this.approveRequest(this.idToApprove);
        }
        else if(this.request_type === 'HOLD')
        {
            this.holdRequest(this.idToApprove);
        }
        else if(this.request_type === 'REJECT')
        {
            this.rejectRequest(this.idToApprove);
        }
    }

    approveRequest(idToApprove:number)
    {
        //console.log("calling approve service");
            this.accountAppovalService.approveRequest(idToApprove.toString())
            .subscribe((data) => {
                //console.log("Approval Response : "+data);
                this.msgs.push({ severity: "info", summary: "Registration Approved", detail: "Approval Request processed successfully" });
                this.approved = false;
                this.disabled=false;
                this.getPendingApprovals(this.userName);

            },
            error => {
                console.log(error);
                this.msgs.push({ severity: "error", summary: "Failed to process request", detail: error });
                this.approved = false;
                this.disabled = false;
            });
    }

    holdRequest(idToApprove:number)
    {
        console.log("calling hold service");
            this.accountAppovalService.holdRequest(idToApprove.toString())
            .subscribe((data) => {
                //console.log("Hold Response : "+data);
                this.msgs.push({ severity: "info", summary: "Registration On Hold", detail: "Approval Request processed successfully" });
                this.approved = false;
                this.disabled=false;
                this.getPendingApprovals(this.userName);

            },
            error => {
                console.log(error);
                this.msgs.push({ severity: "error", summary: "Failed to process request", detail: error });
                this.approved = false;
                this.disabled = false;
            });
    }


    rejectRequest(idToApprove:number)
    {
        //console.log("calling reject service");
            this.accountAppovalService.rejectRequest(idToApprove.toString())
            .subscribe((data) => {
                console.log("Reject Response : "+data);
                this.msgs.push({ severity: "info", summary: "Registration Rejected", detail: "Approval Request processed successfully" });
                this.approved = false;
                this.disabled=false;
                this.getPendingApprovals(this.userName);

            },
            error => {
                console.log(error);
                this.msgs.push({ severity: "error", summary: "Failed to process request", detail: error });
                this.approved = false;
                this.disabled = false;
            });
    }

    showDialog()
    {
        this.approved = true;
    }

    setApproveRequestData(idToApprove:number)
    {
        this.idToApprove=idToApprove;
        //console.log("input params set : "+this.idToApprove);
        this.request_type = 'APPROVE';
    }

    setOnHoldRequestData(idToApprove:number)
    {
        this.idToApprove=idToApprove;
        //console.log("input params set : "+this.idToApprove);
        this.request_type = 'HOLD';
    }

    setRejectRequestData(idToApprove:number)
    {
        this.idToApprove=idToApprove;
        //console.log("input params set : "+this.idToApprove);
        this.request_type = 'REJECT';
    }

    getPendingApprovals(userName: string) {
        //console.log("caling service for approval account");
        this.pendingApprovals = [];
        this.accountAppovalService.getPendingApprovals(userName)
            .subscribe((data) => {
                if(data.length===0)
                {
                    this.noDataFound = true;
                    //console.log("No requests pending for approval");
                }
                else
                {    
                    this.pendingApprovals = data;
                    //console.log(this.pendingApprovals);
                }
            },
            error => {
                console.log(error);
                this.noDataFound = true;
            });
  };

}