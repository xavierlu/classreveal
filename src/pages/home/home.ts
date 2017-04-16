import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ListStudent } from '../list-student/list-student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  books: FirebaseListObservable<any>;
  students: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.books = angFire.database.list('/Books');
    angFire.database.list('/userProfile')
    .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log(snapshot);
        });
    });
  }

  viewClass(){
    console.log(this.students);
  }
}
