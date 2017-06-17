import {BaseEntity} from '../../core/model/base.entity';
import {UserAccountUserGroup} from './user_account_user_group';
import {UserAccountTypeConstant} from './UserAccountTypeConstant';

export class UserAccount extends BaseEntity{
    username: string;
    userAccountUserGroups: UserAccountUserGroup[];
    active : boolean;
    accountExpired: boolean;
    credentialsExpired:boolean;
    accountLocked:boolean;
    userAccountType:UserAccountTypeConstant;
    employeeNumber:string;
<<<<<<< HEAD
	companyName:string;
=======
>>>>>>> f4d4c06be256da45a6af7b6d90d2c94641306f05
    email: string;
}