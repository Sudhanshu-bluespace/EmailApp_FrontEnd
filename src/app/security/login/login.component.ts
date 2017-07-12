import { Component, OnInit } from '@angular/core';
import { LoginService } from "./login.service";
import { User } from '../model/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../../core/global.service';
import { Message } from "../../message";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  username : string;
  password : string;
  msgs: Message[] = [];
  loggedin: boolean = false;
  user:User;
  
  constructor(private loginService: LoginService, private router: Router,private globalService: GlobalService) {     
 }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.login(this.username,this.password);
  }

  getUserName(){
    
  }

  login(username: string ,password: string) {
    this.loginService.login(this.username,this.password)
            .subscribe((data) => {
              console.log("Raw res : "+data.loggedInUserName+data.uiRoles+data.userType);
              this.user = data;
              console.log("User Data : "+this.user.uiRoles+ " | "+this.user.userType+' | '+this.user);
                 this.loggedInUser();
            },
            error => {
                //alert("Login failed: "+error);
				this.msgs.push({ severity: "error", summary: "Login failed", detail: error });
                this.loggedin = false;
            });
  };
  
  home() {
	  this.router.navigate(['/']);
  }
  
  showDialog() {
        this.loggedin = true;
    }

  loggedInUser() {

    this.loginService.loggedInUser()
            .subscribe((user) => {
                 //console.log('user from server ',user);
                 //console.log('Stringified user',JSON.stringify(user));
                 this.globalService.loggedInUser = user;
                 //sessionStorage.setItem('loggedInUser',JSON.stringify(user));
                 this.globalService.userLoggedIn = true;
                 sessionStorage.setItem('userLoggedIn','true'); 
                 //console.log("User Authenticated.. Setting session storage and Calling pagelinks");
                 this.pageLinksAllowedForUser();     
            },
            error => {
                
            });
  };

  pageLinksAllowedForUser() {

    this.loginService.pageLinksAllowedForUser()
            .subscribe((pageLinks) => {
                 console.log('pageLinks from user ',pageLinks);
                 this.globalService.pageLinks = pageLinks;
                 //sessionStorage.setItem('pageLinks',JSON.stringify(pageLinks)); 
                 this.router.navigate(['/']);                 
                 this.router.navigate(['dashboard']);         
            },
            error => {
                console.log("Error page links : "+error);
            });
  };

}
