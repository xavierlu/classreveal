import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { SchoolData } from '../../providers/school-data';
import 'rxjs/add/operator/debounceTime';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

/**
 * Generated class for the school list page.
 * There is a search bar at the top.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-schoolList',
  templateUrl: 'SchoolList.html'
})


export class SchoolListPage {

  searchTerm: string = '';
  searchControl: FormControl;
  schools: Observable<any>;
  searching: any = false;


  constructor(public navCtrl: NavController, public profileData: ProfileData, public dataService: SchoolData, public angFire: AngularFire, public alertCtrl: AlertController) {
    this.searchControl = new FormControl();

    //this.setFilteredItems();


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

    this.schools = this.angFire.database.list('schoolData')
      .map(schools => schools.filter(school => school.$key.toLowerCase().indexOf(this.searchTerm.replace(" ", "_").toLowerCase()) > -1));

  }

  chooseSchool(schoolName: string) {

    if (schoolName === "") {
      let alert = this.alertCtrl.create({
        title: 'Please enter your school name or go back.',
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });
      alert.present();
    }
    else {
      this.profileData.updateSchool(schoolName.replace(" ", "_"));
      this.navCtrl.pop();
    }
  }
}
