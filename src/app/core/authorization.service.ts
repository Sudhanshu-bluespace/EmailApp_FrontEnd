import { User } from '../security/model/user';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable()
export class AuthorizationService {

    constructor(private globalService: GlobalService) {
    }

    isUserHasRole(role: string) {
        if (this.globalService.loggedInUser) {

            //console.log("Check for role : "+role+" | has access : "+this.globalService.loggedInUser.uiRoles.indexOf(role));
            if (this.globalService.loggedInUser.userType === 'ACC_TYPE_SUPER_ADMIN') {
                //console.log("Super admin found.. roles available by default");
                return true;
            } else if (this.globalService.loggedInUser.uiRoles.indexOf(role) >= 0) {
                return true;
            }
        }
        return false;
    }

}