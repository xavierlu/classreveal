import { Component, NgZone, ApplicationRef } from "@angular/core";
import { Platform } from "ionic-angular";
import { Network } from "ionic-native";
import { LoadingController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";
import { IntroPage } from "../pages/intro/intro";

import { SettingsPage } from "../pages/settings/settings";

import { ProfileData } from "../providers/profile-data";
import firebase from "firebase";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;
  zone: NgZone;
  loader: any;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public profData: ProfileData
  ) {
    this.zone = new NgZone({});
    console.log("initializing firebase...");

    //  this.profData.updateUser();

    //     this.rootPage = TabsPage;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(
          "authChange: user found: " + firebase.auth().currentUser.uid
        );

        this.profData.updateUser();

        this.rootPage = TabsPage;
      } else {
        console.log(
          "authChange: user NOT found: " + firebase.auth().currentUser
        );

        firebase.auth().signOut().then(
          function() {
            console.log("Signed Out");
          },
          function(error) {
            console.error("Sign Out Error", error);
          }
        );
        this.profData.clearInfo();
        this.rootPage = LoginPage;
      }
    });

    //   this.presentLoading();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.presentLoading();
      /*
      this.storage.get("introShown").then(result => {
        if (result) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
          this.storage.set("introShown", true);
        }

        this.loader.dismiss();
      });*/
      // this.loader.dismiss();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

    this.loader.present();
  }
}
