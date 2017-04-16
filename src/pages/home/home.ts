import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ListStudent } from '../list-student/list-student';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  books: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.books = angFire.database.list('/Books');
  }

  viewClass(periodNumber : number): void {
    this.navCtrl.push(ListStudent);
  }
}
