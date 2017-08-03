import {NavController, AlertController, ActionSheetController} from 'ionic-angular';
import {Component, ApplicationRef} from '@angular/core';
import firebase from "firebase";
import {TextAvatarDirective} from '../../directives/text-avatar/text-avatar';

@Component({selector: 'page-viewPerson', templateUrl: 'viewPerson.html'})
export class ViewPerson {
  public userProfile : any;
public data: any;
  //  public birthDate: string;
  loading : any;
    
    public classesShared = new Array();
    public period1 = "";
  public period2 = "";
  public period3 = "";
  public period4 = "";
  public period5 = "";
  public period6 = "";
  public period7 = "";
  public period8 = "";
  public period9 = "";
  public period10 = "";
  public firstName = "";
  public lastName = "";
  public twitter = "";
  public instagram = "";
  public snapchat = "";


  constructor(public navCtrl : NavController, public ar: ApplicationRef) {
      
    console.log("view classmate constructor");
  }


    
    ionViewWillEnter() {
    
        var userID = JSON.parse(window.localStorage.getItem('classmates-user-id')).id; //unpack from local storage here
    console.log("userID - " + userID);
        
        this.data = JSON.parse(window.localStorage.getItem('current-user-data'));
        
    console.log("VIEW PERSON");
firebase.database().ref('/userProfile').child(userID).once("value", snapshot => {
      if (snapshot.hasChild("period1")) {
        this.period1 = snapshot.val().period1;
      }
      if (snapshot.hasChild("period2")) {
        this.period2 = snapshot.val().period2;
      }
      if (snapshot.hasChild("period3")) {
        this.period3 = snapshot.val().period3;
      }
      if (snapshot.hasChild("period4")) {
        this.period4 = snapshot.val().period4;
      }
      if (snapshot.hasChild("period5")) {
        this.period5 = snapshot.val().period5;
      }
      if (snapshot.hasChild("period6")) {
        this.period6 = snapshot.val().period6;
      }
      if (snapshot.hasChild("period7")) {
        this.period7 = snapshot.val().period7;
      }
      if (snapshot.hasChild("period8")) {
        this.period8 = snapshot.val().period8;
      }
      if (snapshot.hasChild("period9")) {
        this.period9 = snapshot.val().period9;
      }
      if (snapshot.hasChild("period10")) {
        this.period10 = snapshot.val().period10;
      }
      if (snapshot.hasChild("firstName")) {
        this.firstName = snapshot.val().firstName;
        console.log("view person(): firstname " + this.firstName);
      }
      if (snapshot.hasChild("lastName")) {
        this.lastName = snapshot.val().lastName;
      }
      if (snapshot.hasChild("snapchat")) {
        this.snapchat = snapshot.val().snapchat;
      }
      if (snapshot.hasChild("instagram")) {
        this.instagram = snapshot.val().instagram;
      }
      if (snapshot.hasChild("twitter")) {
        this.twitter = snapshot.val().twitter;
      }
      
    this.ar.tick();
    
    console.log(this.period2 + " --- " + this.data.per2);
        if(this.period1 != "" && (this.data.per1 === this.period1))
        {
            this.classesShared.push({teacherName: this.period1, periodNumber: '1'});
        }
        if(this.period2 != "" && (this.data.per2 === this.period2))
        {
            this.classesShared.push({teacherName: this.period2, periodNumber: '2'});
        }
        if(this.period3 != "" && (this.data.per3 === this.period3))
        {
            this.classesShared.push({teacherName: this.period3, periodNumber: '3'});
        }
        if(this.period4 != "" && (this.data.per4 === this.period4))
        {
            this.classesShared.push({teacherName: this.period4, periodNumber: '4'});
        }
        if(this.period5 != "" && (this.data.per5 === this.period5))
        {
            this.classesShared.push({teacherName: this.period5, periodNumber: '5'});
        }
        if(this.period6 != "" && (this.data.per6 === this.period6))
        {
            this.classesShared.push({teacherName: this.period6, periodNumber: '6'});
        }
        if(this.period7 != "" && (this.data.per7 === this.period7))
        {
            this.classesShared.push({teacherName: this.period7, periodNumber: '7'});
        }
        if(this.period8 != "" && (this.data.per8 === this.period8))
        {
            this.classesShared.push({teacherName: this.period8, periodNumber: '8'});
        }
        if(this.period9 != "" && (this.data.per9 === this.period9))
        {
            this.classesShared.push({teacherName: this.period9, periodNumber: '9'});
        }
        if(this.period10 != "" && (this.data.per10 === this.period10))
        {
            this.classesShared.push({teacherName: this.period10, periodNumber: '0'});
        }

      
      console.log("VIEW CLASSMATE COMPARISON");
    console.log(this.classesShared);
    
    
    
    });
  }
    
 

  

checkPeriods() {
    
    
}

    
}