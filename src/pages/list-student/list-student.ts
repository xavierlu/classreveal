import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { ProfileData } from '../../providers/profile-data';
import firebase from 'firebase';
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
  public ids = [];
  public names = new Array();
  public teacher = "";
    periodNum = 0;
    
  constructor(public navCtrl: NavController, public angFire: AngularFire, public profileData: ProfileData) {


  }

  ionViewDidLoad() {
    var periodNumm = JSON.parse(window.localStorage.getItem('current-viewing-period')).period;
    var temp = "";
      
    console.log("SCHOOL - " + this.profileData.getUsersSchool());
    console.log("TEACHER - " + this.profileData.getPeriod(periodNumm));
    console.log("PERIOD - " + periodNumm);

    this.teacher =  this.profileData.getPeriod(periodNumm)
    this.periodNum = periodNumm
      
    this.students = this.angFire.database.list('/schoolData/' + this.profileData.getUsersSchool() + '/classData/' + this.profileData.getPeriod(periodNumm) + '/period' + periodNumm, { preserveSnapshot: true });

    this.students.subscribe(snapshots => {

      snapshots.forEach(snapshot => {
        console.log("key " + snapshot.key)
        console.log(snapshot.val())
        temp = snapshot.key;  //uid
        //this.names.[temp] = {name: "", uid: snapshot.key};
          

        firebase.database().ref('/userProfile/' + snapshot.key).once(
          'value', (snapshot) => {
            var firstName = "";
            var lastName = "";
            if (snapshot.hasChild('firstName')) {
              firstName = snapshot.val().firstName;
            }
            if (snapshot.hasChild('lastName')) {
              lastName = snapshot.val().lastName;
            }

            console.log("For " + snapshot.key + " name: " + firstName + " " + lastName)
            
            var classmateJson = {
                "uid": snapshot.key,
                "fullName": firstName + " " + lastName
            }
            console.log("JSON");
            console.log(classmateJson);
              
            this.names.push(classmateJson);
            console.log(this.names)
          });
          
        console.log("here")
      });

      console.log("NAMES:");
      console.log(this.names);
        
    });

  }
}
