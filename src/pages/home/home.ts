import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ListStudent } from '../list-student/list-student';
import { ProfileData } from '../../providers/profile-data';
import { ListPage } from '../list/list';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public userProfile: any;
    public inEditMode = false;

 // @ViewChild("1") sketchElement: ElementRef;

  COLORS: any[] = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
    '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#d4e157', '#673ab7',
    '#ffb74d', '#a1887f', '#90a4ae'];

  constructor(private alertCtrl: AlertController, private elementRef: ElementRef, public navCtrl: NavController, angFire: AngularFire, public profileData: ProfileData) {
    console.log("home page constructor");
      
  //  this.profileData.updateInfo();
  }

    
    
  ionViewWillEnter() {
      
      this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      //   this.birthDate = this.userProfile.birthDate;
    });
  }

  addClass() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Period');

    if (this.userProfile.period1 == "" || this.userProfile.period1 == null)
      alert.addInput({ type: 'radio', label: 'Period 1', value: '1', checked: false });

    if (this.userProfile.period2 == "" || this.userProfile.period2 == null)
      alert.addInput({ type: 'radio', label: 'Period 2', value: '2', checked: false });

    if (this.userProfile.period3 == "" || this.userProfile.period3 == null)
      alert.addInput({ type: 'radio', label: 'Period 3', value: '3', checked: false });

    if (this.userProfile.period4 == "" || this.userProfile.period4 == null)
      alert.addInput({ type: 'radio', label: 'Period 4', value: '4', checked: false });

    if (this.userProfile.period5 == "" || this.userProfile.period5 == null)
      alert.addInput({ type: 'radio', label: 'Period 5', value: '5', checked: false });

    if (this.userProfile.period6 == "" || this.userProfile.period6 == null)
      alert.addInput({ type: 'radio', label: 'Period 6', value: '6', checked: false });

    if (this.userProfile.period7 == "" || this.userProfile.period7 == null)
      alert.addInput({ type: 'radio', label: 'Period 7', value: '7', checked: false });

    if (this.userProfile.period8 == "" || this.userProfile.period8 == null)
      alert.addInput({ type: 'radio', label: 'Period 8', value: '8', checked: false });

    if (this.userProfile.period9 == "" || this.userProfile.period9 == null)
      alert.addInput({ type: 'radio', label: 'Period 9', value: '9', checked: false });

    if (this.userProfile.period10 == "" || this.userProfile.period10 == null)
      alert.addInput({ type: 'radio', label: 'Period 10', value: '10', checked: false });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Next',
      handler: periodNumber => {
        var data = {
          period: +periodNumber,
          prevTeacher: this.profileData.getPeriod(+periodNumber)
        };
        if (this.profileData.getUsersSchool() === '') {
          let alert = this.alertCtrl.create({
            title: 'Please enter your school name',
            buttons: [{ text: 'OK' }]
          });
          alert.present();
        }
        else {
          window.localStorage.setItem('current-modifying-peroid', JSON.stringify(data));
          this.navCtrl.push(ListPage);
        }
      }
    });
    alert.present();
  }

  editTeacher(periodNumber: number) {
    var data = {
      period: +periodNumber,
      prevTeacher: this.profileData.getPeriod(+periodNumber)
    };
    if (this.profileData.getUsersSchool() === '') {
      let alert = this.alertCtrl.create({
        title: 'Please enter your school name',
        buttons: [{ text: 'OK' }]
      });
      alert.present();
    }
    else {
      window.localStorage.setItem('current-modifying-peroid', JSON.stringify(data));
      this.navCtrl.push(ListPage);
    }
  }

  removeTeacher(periodNumber: number) {
    let alert = this.alertCtrl.create({
      message: 'Remove Period' + periodNumber + ' ?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.profileData.updateTeacher("", periodNumber, "");
          }
        }
      ]
    });
    alert.present();
  }

  viewClass(periodNumber: number): void {
    var data = {
      period: periodNumber
    };
    window.localStorage.setItem('current-viewing-period', JSON.stringify(data));
    this.navCtrl.push(ListStudent);
  }

  getColor(str: string): string {
    return this.COLORS[Math.abs(this.generateHashCode(str.replace("_", " "))) % this.COLORS.length];
  }

  generateHashCode(str: string): number {
    let h = 0;
    if (str.length > 0) {
      for (let i = 0; i < str.length; i++) {
        h = 31 * h + str.charCodeAt(i);
        h |= 0; // Convert to 32bit integer
      }
    }
    return h;
  };
}
