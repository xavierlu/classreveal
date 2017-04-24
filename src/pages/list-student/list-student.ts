import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { ProfileData } from '../../providers/profile-data';

/**
 * Generated class for the ListStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-student',
  templateUrl: 'list-student.html'
})
export class ListStudent {

  public students: Observable<any>;

  constructor(public navCtrl: NavController, public angFire: AngularFire, public profileData: ProfileData) {
      
     
  }
    
ionViewDidLoad() {
     var periodNumm =  JSON.parse( window.localStorage.getItem('current-viewing-period')).period;

      console.log("SCHOOL - " + this.profileData.getUsersSchool());
       console.log("TEACHER - " + this.profileData.getPeriod(periodNumm));
    console.log("PERIOD - " + periodNumm);
      
    this.students = this.angFire.database.list('/schoolData/' + this.profileData.getUsersSchool() + '/classData/' + this.profileData.getPeriod(periodNumm) + '/period' + periodNumm);
      
    console.log(this.students);
}

}
