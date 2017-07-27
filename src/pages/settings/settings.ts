import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {Component} from '@angular/core';
import {ProfileData} from '../../providers/profile-data';
import {AuthData} from '../../providers/auth-data';
import {LoginPage} from '../login/login';
import {ListPage} from '../list/list';
import {SchoolListPage} from '../schoolList/schoolList';
import {EditProfile} from '../editProfile/editProfile';

import {TextAvatarProfileDirective} from '../../directives/text-avatar-profile/text-avatar-profile';

@Component({selector: 'page-settings', templateUrl: 'settings.html'})
export class SettingsPage {
  public userProfile : any;
  //  public birthDate: string;
  loading : any;

  constructor(public navCtrl : NavController, public profileData : ProfileData, public authData : AuthData, public alertCtrl : AlertController, public actionSheetCtrl : ActionSheetController) {}

  editPressed()
  {
    this
      .navCtrl
      .push(EditProfile);
  }

  ionViewDidEnter() {
    this
      .profileData
      .getUserProfile()
      .on('value', (data) => {
        this.userProfile = data.val();
        //   this.birthDate = this.userProfile.birthDate;
      });
  }

  logOut() {
    this
      .authData
      .logoutUser()
      .then(() => {
        this
          .navCtrl
          .setRoot(LoginPage);
      });
  }

  deleteUser() {

    let alert = this
      .alertCtrl
      .create({
        message: 'Are you sure you want to delete your account?',
        buttons: [
          {
            text: 'Cancel'
          }, {
            text: 'Yes',
            handler: data => {
              for (var i = 1; i <= 10; i++) {
                this.profileData.updateTeacher("", i, String(this.profileData.getPeriod(+ i)));
              }
              this.profileData.deleteUser();
              this.authData.deleteUser();
              this.navCtrl.setRoot(LoginPage);
            }
          }
        ]
      });
    alert.present();
  }
}
