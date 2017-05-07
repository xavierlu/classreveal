import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class SchoolData {

  schools: any;

  constructor(angFire: AngularFire) {

    //    this.schools = angFire.database().list('/schoolNames/');
  }

  filterItems(searchTerm) {
    return this.schools;
  }

}
