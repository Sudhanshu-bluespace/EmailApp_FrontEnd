import { Injectable } from "@angular/core";
import { ContactService } from "../contact/contact.service";
import { GroupService } from "../group/group.service";
import { SelectItem } from 'primeng/primeng';
import { Contact } from "../contact/contact";
import { ContactSearchCriteria } from "../contact/contact_search_criteria";
import { GroupSearchCriteria } from "../group/group_search_criteria";
import { Group } from "../group/group";

@Injectable()
export class CommonService {

    groupItems: SelectItem[];
    groupNamesForSearch: SelectItem[];
    contacts: Contact[];
    contactSearchCriteria = new ContactSearchCriteria();
    groups: Group[];
    groupSearchCriteria = new GroupSearchCriteria();

    constructor(private contactService: ContactService, private groupService: GroupService) { }

    resetContactsBySearchCriteria() {
        this.contacts = [];
        this.contactSearchCriteria = new ContactSearchCriteria();
    }

    resetGroupsBySearchCriteria() {
        this.groups = [];
        this.groupSearchCriteria = new GroupSearchCriteria();
    }

    getAllContacts(username:string) {
        this.contactService.getAllContacts(username)
            .subscribe(
            contacts => {
                this.contacts = contacts;
                for (let contact of this.contacts) {
                    for (let contactGroup of contact.contactGroups) {
                        if (contact.groupDetails === undefined) {
                            contact.groupDetails = contactGroup.group.name;
                        } else {
                            contact.groupDetails += ", " + contactGroup.group.name;
                        }
                    }
                }
            }
            );
    }

    getAllContactsBySearchCriteria(username:string) {
        this.contactService.getAllContactsByCriteria(this.contactSearchCriteria,username)
            .subscribe(
            contacts => {
                this.contacts = contacts;
                for (let contact of this.contacts) {
                    for (let contactGroup of contact.contactGroups) {
                        if (contact.groupDetails === undefined) {
                            contact.groupDetails = contactGroup.group.name;
                        } else {
                            contact.groupDetails += ", " + contactGroup.group.name;
                        }
                    }
                }
            }
            );
    }

    getAllGroups(username:string) {
        this.groupService.getAllGroups(username)
            .subscribe(
            groups => {
                this.groupItems = [];
                this.groupNamesForSearch = [];
                for (let group of groups) {
                    this.groupItems.push({ label: group.name, value: group });
                    this.groupNamesForSearch.push({ label: group.name, value: group.id });
                }
            }
            );
    }

    searchGroupsByCriteria(username:string) {
        this.groupService.getAllGroupsBySearchCriteria(this.groupSearchCriteria,username)
            .subscribe(
            groups => this.groups = groups
            );
    }

}