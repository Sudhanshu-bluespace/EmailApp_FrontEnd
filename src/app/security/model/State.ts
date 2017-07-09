import {BaseEntity} from '../../core/model/base.entity';
export class State extends BaseEntity {

    public id:number;
    public name:string;
    public state_code:string;
    public country_id:number;
}