import { BaseEntity } from '../../core/model/base.entity';

export class BlockedContacts extends BaseEntity
{
    public firstName:string;
    public lastName:string;
    public email:string;
    public reason:string;
    public responseCode:string;
}