import { Component, OnInit,ContentChildren, QueryList, AfterContentInit  } from '@angular/core';
//import { LoginService } from "../security/login/login.service";
//import { User } from '../model/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../core/global.service';
import { Tab } from './tab.component';

@Component({
selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs">
        <h5 (click)="selectTab(tab)" [class.active]="tab.active">{{tab.title}}</h5>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [`
    ul {
		background:#19334d;
		box-shadow: 4px 4px 9px grey;
		/*border: 2px solid #19334d;
		border-radius: 5px;*/
		
	}
    li h5 {
		cursor:pointer; cursor:hand;
	}
    ul li h5{
      padding: 0.5em 2em;
	  border-right: 1px solid white;
	  color:white;
    }
  `],
})
export class Tabs implements AfterContentInit {

  @ContentChildren(Tab) tabs: QueryList<Tab>;
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: Tab){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }

}