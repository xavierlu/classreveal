import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { SchoolListPage } from '../schoolList/schoolList';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public userProfile: any;
  //  public birthDate: string;
  loading: any;

  constructor(public navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {


  }

  ionViewDidEnter() {
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      //   this.birthDate = this.userProfile.birthDate;
    });
  }

  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  updateName() {
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
            try {
              this.profileData.updateName(data.firstName, data.lastName).then(authData => {
                let alert2 = this.alertCtrl.create({
                  message: "Successfully updated",
                  buttons: [
                    {
                      text: "OK",
                      role: 'cancel'
                    }
                  ]
                });
                alert2.present();
              }
              );
            } catch (e) {
              let alert2 = this.alertCtrl.create({
                message: e.message,
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]
              });
              alert2.present();
            }
          }
        }
      ]
    });
    alert.present();
  }

  updateGrade() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select your grade',
      buttons: [
        {
          text: '9',
          handler: () => {
            this.profileData.updateGrade(9);
          }
        },
        {
          text: '10',
          handler: () => {
            this.profileData.updateGrade(10);
          }
        },
        {
          text: '11',
          handler: () => {
            this.profileData.updateGrade(11);
          }
        },
        {
          text: '12',
          handler: () => {
            this.profileData.updateGrade(12);
          }
        }
      ]
    });

    actionSheet.present();
  }

  updateEmail() {
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
            this.profileData.updateEmail(data.newEmail, data.password).then(error => {
              let alert2 = this.alertCtrl.create({
                message: "Error",
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]
              });
              alert2.present();
            }, authData => {
              let alert2 = this.alertCtrl.create({
                message: "Successfully updated",
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]
              });
              alert2.present();
            }
            );
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword() {
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
            this.profileData.updatePassword(data.newPassword, data.oldPassword).then(error => {
              let alert2 = this.alertCtrl.create({
                message: "Error",
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]
              });
              alert2.present();
            }, authData => {
              let alert2 = this.alertCtrl.create({
                message: "Successfully updated",
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]
              });
              alert2.present();
            });
          }
        }
      ]
    });
    alert.present();
  }

  updateTeacher(periodNumber: number) {
    var data = {
      period: periodNumber,
      prevTeacher: this.profileData.getPeriod(periodNumber)
    };
    console.log("School - " + this.profileData.getUsersSchool());
    if (this.profileData.getUsersSchool() === '') {
      let alert = this.alertCtrl.create({
        title: 'Please enter your school name',
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });
      alert.present();
    }
    else {
      window.localStorage.setItem('current-modifying-peroid', JSON.stringify(data));
      this.navCtrl.push(ListPage);
    }

  }

  updateSchool() {
    this.navCtrl.push(SchoolListPage);
  }
}
