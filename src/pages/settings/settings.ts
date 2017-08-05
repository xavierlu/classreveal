import {
  NavController,
  AlertController,
  ActionSheetController
} from "ionic-angular";
import { Component, ApplicationRef } from "@angular/core";
import { ProfileData } from "../../providers/profile-data";
import { AuthData } from "../../providers/auth-data";
import { LoginPage } from "../login/login";
import { ListPage } from "../list/list";
import { SchoolListPage } from "../schoolList/schoolList";
import { EditProfile } from "../editProfile/editProfile";
import firebase from "firebase";
import { SocialSharing } from "@ionic-native/social-sharing";
import { TextAvatarProfileDirective } from "../../directives/text-avatar-profile/text-avatar-profile";

@Component({ selector: "page-settings", templateUrl: "settings.html" })
export class SettingsPage {
  public userProfile: any;
  //  public birthDate: string;
  loading: any;

  public schoolName = "hafjkh";
  private firstName = "";
  public lastName = "";
  public email = "";
  public instagram = "";
  public snapchat = "";
  public twitter = "";
  public obj = {
    schoolName: "",
    firstName: "",
    lastName: "",
    email: "",
    instagram: "",
    snapchat: "",
    twitter: ""
  };

  constructor(
    public navCtrl: NavController,
    public profileData: ProfileData,
    public authData: AuthData,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public ar: ApplicationRef,
    private socialSharing: SocialSharing
  ) {
    console.log("settings constructor");
  }

  shareWithFriends() {
    var socSharing = this.socialSharing;

    firebase
      .database()
      .ref("/shareURLs/")
      .once("value")
      .then(function(snapshot) {
        var ur = snapshot.child("other").val();
        console.log(ur);

        socSharing
          .shareWithOptions({
            message:
              "Are you in any of my classes? Check Class Reveal to see. Download now at " +
              ur
          })
          .then(() => {
            console.log("Shared!");
          })
          .catch(err => {
            console.log("Oops, something went wrong:", err);
          });
      });
  }

  editPressed() {
    //send data to edit page

    this.navCtrl.push(EditProfile);
  }

  ionViewWillEnter() {
    var data = JSON.parse(window.localStorage.getItem("current-user-data"));

    this.obj.schoolName = data.school;
    this.obj.firstName = data.firstName;
    this.obj.lastName = data.lastName;
    this.obj.email = data.email;
    this.obj.instagram = data.instagram;
    this.obj.twitter = data.twitter;
    this.obj.snapchat = data.snapchat;

    console.log("SETTINGS: " + this.firstName);
    console.log(data);
    console.log(this.obj);

    // this.ar.tick();

  }

   ionViewDidEnter() {

       this.ar.tick();
   }

  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  deleteUser() {
    let alert = this.alertCtrl.create({
      message: "Are you sure you want to delete your account?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Yes",
          handler: data => {
            for (var i = 1; i <= 10; i++) {
              this.profileData.updateTeacher(
                "",
                i,
                String(this.profileData.getPeriod(+i))
              );
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
