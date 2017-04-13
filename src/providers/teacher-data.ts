import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TeacherData {

    teachers: any;

    constructor() {
        this.teachers = [
            {title: 'reichdaddy'},
            {title: 'scarpitta'},
            {title: 'fortunato'},
            {title: 'hayden'},
            {title: 'fisher'},
            {title: 'hussong'},
            {title: 'sierzega'},
            {title: 'daniel'},
            {title: 'wayton'},
            {title: 'krause'}
        ]
    }

    filterItems(searchTerm){
        return this.teachers.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    }

}
