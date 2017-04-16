import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Generated class for the ListStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-student',
  templateUrl: 'list-student.html',
})
export class ListStudent {

  students: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.students = angFire.database.list('/userProfile');
    console.log(this.students);
  }

  ionViewDidLoad() {
    console.log("loaded");
  }

}
