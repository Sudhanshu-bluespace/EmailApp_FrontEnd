import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageLink } from '../security/model/pagelink';
import { User } from '../security/model/user';
import { LoginService } from '../security/login/login.service';
import { GlobalService } from '../core/global.service';
import { AuthorizationService } from '../core/authorization.service';
import { MdMenuModule } from '@angular/material';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _pageLinks: PageLink[];
  private _user: User;
  backgroundImg:any;

  constructor(private router: Router, private loginService: LoginService,
    private globalService: GlobalService, private authorizationService: AuthorizationService,private sanitizer:DomSanitizer) {
    this.backgroundImg = sanitizer.bypassSecurityTrustStyle('url(../../app/resources/images/background.jpg)');  
  }

  ngOnInit() {
  }

  get userLoggedIn(): boolean {
    //console.log("checking user logged in");
    let userLoggedIn = false;
    if(this.globalService.userLoggedIn)
    {
      //console.log("globalServic is enabled - "+this.globalService.userLoggedIn);
      userLoggedIn = this.globalService.userLoggedIn;
      return userLoggedIn;

    }
    else if(sessionStorage.getItem('userLoggedIn'))
    {
        //console.log("************************* gobal service oops.. check sessionStorage : "+sessionStorage.getItem('loggedInUser')+" | "+sessionStorage.getItem('userLoggedIn'));
        this.globalService.userLoggedIn = true;
        this.globalService.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));    
        return (sessionStorage.getItem('userLoggedIn')==='true');
    }

  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['']);
    this.loginService.logout().subscribe(() => {
      window.location.reload();
    },
      error => {
      });
  }

changePassword() {
    this.router.navigate(['changePassword']);
  }
  
/*analytics() {
	this.router.navigate(['analytics']);
}	*/


  get pageLinks(): PageLink[] {
    /*this._pageLinks = [];
    let pageLink   = new PageLink();
    pageLink.label = "CONTACTS";
    pageLink.url = "contacts";
    this._pageLinks.push(pageLink);

    pageLink   = new PageLink();
    pageLink.label = "GROUPS";
    pageLink.url = "groups";
    this._pageLinks.push(pageLink);

    pageLink   = new PageLink();
    pageLink.label = "SEND_EMAILS";
    pageLink.url = "send_emails";
    this._pageLinks.push(pageLink); */
    this._pageLinks = this.globalService.pageLinks;
    //console.log(this._pageLinks);
    return this._pageLinks;
  }

  get user(): User {
    this._user = this.globalService.loggedInUser;
    return this._user;
  }


}
