import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ListStudent } from '../list-student/list-student';
import { ProfileData } from '../../providers/profile-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public userProfile: any;

  @ViewChild("1") sketchElement: ElementRef;

  COLORS: any[] = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
    '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#d4e157', '#673ab7',
    '#ffb74d', '#a1887f', '#90a4ae'];

  constructor(private elementRef: ElementRef, public navCtrl: NavController, angFire: AngularFire, public profileData: ProfileData) {
  }

  ionViewDidEnter() {
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      //   this.birthDate = this.userProfile.birthDate;
    });
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
