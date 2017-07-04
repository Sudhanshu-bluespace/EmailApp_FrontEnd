import {BaseEntity} from '../../core/model/base.entity';

export class Country extends BaseEntity {

    public id:number;
    public shortName:string;
    public fullName:string;
    public isdCode:string;
}