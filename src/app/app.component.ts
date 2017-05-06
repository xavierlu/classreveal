import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfileData } from '../providers/profile-data';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.zone = new NgZone({});
    console.log("initializing firebase...");
    firebase.initializeApp({
      apiKey: "AIzaSyArtrcZzDp_OEquRaiwxPQ9K--Wx0fw0nU",
      authDomain: "classreveal-3146f.firebaseapp.com",
      databaseURL: "https://classreveal-3146f.firebaseio.com",
      projectId: "classreveal-3146f",
      storageBucket: "classreveal-3146f.appspot.com",
      messagingSenderId: "691736012118"
    });



    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user found: " + firebase.auth().currentUser.uid);
        var data = {
          thisUser: firebase.auth().currentUser
        };
        window.localStorage.setItem('current-user', JSON.stringify(data));
        console.log("thisUSer " + data.thisUser);

        this.rootPage = TabsPage;
      } else {
        console.log("user found not found " + firebase.auth().currentUser);
        var data = {
          thisUser: firebase.auth().currentUser
        };
        window.localStorage.setItem('current-user', JSON.stringify(data));
        console.log("thisUSer " + data.thisUser);
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


  }
}
