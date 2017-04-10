import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  updateName(){
    let alert = this.alertCtrl.create({
      title: 'Update name',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  // updateDOB(birthDate){
  //   this.profileData.updateDOB(birthDate);
  // }

  updateEmail(){
    let alert = this.alertCtrl.create({
      title: 'Update email',
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      title: 'Change password',
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Your current password',
          type: 'password'
        },
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

  updateTeacher(periodNumber : number){
    let alert = this.alertCtrl.create({
      title: 'Update teacher',
      message: 'Period ' + periodNumber,
      inputs: [
        {
          name: 'name',
          placeholder: 'last name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateTeacher(data.name, periodNumber);
          }
        }
      ]
    });
    alert.present();
  }
}
