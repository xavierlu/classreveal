import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Component, ApplicationRef } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { SchoolListPage } from '../schoolList/schoolList';

import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-editProfile',
  templateUrl: 'editProfile.html',
})
export class EditProfile {
  public userProfile: any;
  //  public birthDate: string;
  loading: any;
public schoolName = "";
    public firstName = "";
public lastName = "";
    public email = "";
    public OLDschoolName = "";
    public OLDfirstName = "";
    public OLDlastName = "";
    public OLDemail = "";
    public instagram = "";
    public snapchat = "";
     public OLDinstagram = "";
    public OLDsnapchat = "";
    public twitter = "";
    public OLDtwitter = "";
    
  constructor(public navCtrl: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public ar: ApplicationRef) {

    console.log("edit profile constructor");

  }



    donePressed()
    {
        
        //update everything
        
        if(!(this.OLDfirstName === this.firstName) || !(this.OLDlastName === this.lastName))
        {
            console.log("name changed... lets update it");
            
            this.profileData.updateName(this.firstName, this.lastName)
        }
        if(!(this.OLDsnapchat === this.snapchat))
        {
            console.log("snap changed... lets update it");
            
            this.profileData.updateSnapchat(this.snapchat);
        }
        if(!(this.OLDtwitter === this.twitter))
        {
            console.log("twitter changed... lets update it");
            
            this.profileData.updateTwitter(this.twitter);
        }
        if(!(this.OLDinstagram === this.instagram))
        {
            console.log("insta changed... lets update it");
            
            this.profileData.updateInstagram(this.instagram);
        }
        
        
        this.navCtrl.pop(SettingsPage);
    }


    
   
  ionViewWillEnter() {
      
      var data = JSON.parse(window.localStorage.getItem('current-user-data'));
      
      this.schoolName = data.school;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.OLDschoolName = data.school;
      this.OLDfirstName = data.firstName;
      this.OLDlastName = data.lastName;
      this.OLDemail = data.email;
      this.instagram = data.instagram;
      this.OLDinstagram = data.instagram;
      this.twitter = data.twitter;
      this.OLDtwitter = data.twitter;
      this.snapchat = data.snapchat;
      this.OLDsnapchat = data.snapchat;
      
    console.log("EDIT PROFILE " + this.firstName);
      
      this.ar.tick();
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

    try{
      let alert = this.alertCtrl.create({
        title: 'Update login email',

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
              this.profileData.updateEmail(data.newEmail, data.password).then(data => {
                let alert2 = this.alertCtrl.create({
                  message: "Success",
                  buttons: [
                    {
                      text: "OK",
                      role: 'cancel'
                    }
                  ]
                });
                alert2.present();
              }, error => {
                let alert2 = this.alertCtrl.create({
                  message: error.message,
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
    }catch(e){
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
            try{
              this.profileData.updatePassword(data.oldPassword, data.newPassword).then(data => {
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
            }, error => {
              let alert2 = this.alertCtrl.create({
                message: error.message,
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]
              });
              alert2.present();
            });
            }catch(e){
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

  

  updateSchool() {
    this.navCtrl.push(SchoolListPage);
  }
}
