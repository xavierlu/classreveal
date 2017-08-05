import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs/Rx";
import { ProfileData } from "../../providers/profile-data";
import firebase from "firebase";

import { ViewPerson } from "../viewPerson/viewPerson";
import { SocialSharing } from "@ionic-native/social-sharing";

/**
 * Generated class for the ListStudent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-list-student",
  templateUrl: "list-student.html"
})
export class ListStudent {
  public students: Observable<any>;
  public ids = [];
  public names = new Array();
  public teacher = "";
  private periodNum = 0;
  public message = "";
  private url = "";
  private isLoading: boolean = true;

  constructor(
    public navCtrl: NavController,
    public angFire: AngularFire,
    public profileData: ProfileData,
    public plt: Platform,
    private socialSharing: SocialSharing
  ) {}

  ionViewDidLoad() {
    var periodNumm = JSON.parse(
      window.localStorage.getItem("current-viewing-period")
    ).period;
    var temp = "";

    console.log("SCHOOL - " + this.profileData.getUsersSchool());
    console.log("TEACHER - " + this.profileData.getPeriod(periodNumm));
    console.log("PERIOD - " + periodNumm);

    this.teacher = String(
      this.profileData.getPeriod(periodNumm).replace("_", " ")
    );
    this.periodNum = periodNumm;

    this.message =
      "Check out who is in my period " +
      this.periodNum +
      " class with " +
      this.teacher +
      ": \n";
    this.url = "hi";
    this.students = this.angFire.database.list(
      "/schoolData/" +
        this.profileData.getUsersSchool() +
        "/classData/" +
        this.profileData.getPeriod(periodNumm) +
        "/period" +
        periodNumm,
      { preserveSnapshot: true }
    );

    this.students.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log("key " + snapshot.key);
        console.log(snapshot.val());
        temp = snapshot.key; //uid
        //this.names.[temp] = {name: "", uid: snapshot.key};

        firebase
          .database()
          .ref("/userProfile/" + snapshot.key)
          .once("value", snapshot => {
            this.isLoading = true;
            var firstName = "";
            var lastName = "";
            if (snapshot.hasChild("firstName")) {
              firstName = snapshot.val().firstName;
            }
            if (snapshot.hasChild("lastName")) {
              lastName = snapshot.val().lastName;
            }

            console.log(
              "For " + snapshot.key + " name: " + firstName + " " + lastName
            );

            this.message = this.message + firstName + " \n";

            console.log("MESSAGE: " + this.message);

            var classmateJson = {
              uid: snapshot.key,
              fullName: firstName + " " + lastName
            };
            console.log("JSON");
            console.log(classmateJson);

            this.names.push(classmateJson);
            console.log(this.names);
            this.isLoading = false;
          });
      });

      console.log("NAMES:");
      console.log(this.names);
    });
  }

  shareClass() {
      
      var m = this.message;
      var socSharing = this.socialSharing;
      
      firebase.database().ref("/shareURLs/").once("value").then(function(snapshot) {
          
          var ur = snapshot.child("other").val();
          console.log(ur);
          console.log(m);
       // console.log(this.message);
        
          m = m + "Wanna see who is in your classes? Download Class Reveal: " + ur;
            socSharing.shareWithOptions({
                  message: m
            }).then(() => {
                console.log('Shared!');
              }).catch((err) => {
                console.log('Oops, something went wrong:', err);
              });
        });
  }
    
    
    presentClassmateInfo(uid: string)
    {
        var data = {
            id: uid
        };
        console.log(data);
        window.localStorage.setItem("classmates-user-id", JSON.stringify(data));
        
        this.navCtrl.push(ViewPerson);
    }
}
