import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { TeacherData } from '../../providers/teacher-data';
import { ProfileData } from '../../providers/profile-data';
import 'rxjs/add/operator/debounceTime';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';


/**
 * Generated class for the teacher list page.
 * There is a search bar at the top.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  searchTerm: string = '';
  searchControl: FormControl;
  teachers: Observable<any>;
  searching: any = false;
  school: String;

  constructor(public navCtrl: NavController, public profileData: ProfileData, public dataService: TeacherData, public angFire: AngularFire, public alertCtrl: AlertController) {
    this.searchControl = new FormControl();
    this.school = this.profileData.getUsersSchool();
    //  console.log("SCHOOL - " + this.school);
  }

  ionViewDidLoad() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();

    });


  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.teachers = this.angFire.database.list('schoolData/' + this.school + '/teachers')
      .map(schools => schools.filter(school => school.$key.toLowerCase().indexOf(this.searchTerm.replace(" ", "_").toLowerCase()) > -1));
  }

  removeTeacher() {
    var data = JSON.parse(window.localStorage.getItem('current-modifying-peroid'));

    this.profileData.updateTeacher("", data.period, data.prevTeacher);
    this.navCtrl.pop();
  }

  chooseTeacher(teacherName: string) {
    var data = JSON.parse(window.localStorage.getItem('current-modifying-peroid'));
    teacherName = teacherName.replace(" ", "_");

    if (teacherName === "" || teacherName.split("_").length < 2) {
      let alert = this.alertCtrl.create({
        title: 'Please enter your teacher\'s full name or go back.',
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });
      alert.present();
    }
    else {
      this.profileData.updateTeacher(teacherName, data.period, data.prevTeacher);
      this.navCtrl.pop();
    }
  }
}
