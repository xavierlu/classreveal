import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ListStudent } from '../list-student/list-student';
import { Observable } from 'rxjs/Rx';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    public userProfile: any;

constructor(public navCtrl: NavController, angFire: AngularFire, public profileData: ProfileData) {
  //  this.profileData.updateInfo();
      
  }

    ionViewDidEnter(){
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
   //   this.birthDate = this.userProfile.birthDate;
    });
  }
    
viewClass(periodNumber : number): void {
    var data = {
      period : periodNumber
    };
    window.localStorage.setItem('current-viewing-period', JSON.stringify(data));
    this.navCtrl.push(ListStudent);
  }
}
