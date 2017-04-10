import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class ProfileData {
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstName: string, lastName: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateGrade(gradeNumber: number): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      grade: gradeNumber,
    });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.child(this.currentUser.uid)
          .update({ email: newEmail });
      });
    });
  }


  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }

  updateTeacher(newTeacherName: string, periodNumber: number): firebase.Promise<any> {
    switch (periodNumber){
      case 1:
        return this.userProfile.child(this.currentUser.uid).update({
          period1: newTeacherName
        });

      case 2:
        return this.userProfile.child(this.currentUser.uid).update({
          period2: newTeacherName
        });

      case 3:
        return this.userProfile.child(this.currentUser.uid).update({
          period3: newTeacherName
        });

      case 4:
        return this.userProfile.child(this.currentUser.uid).update({
          period4: newTeacherName
        });

      case 5:
        return this.userProfile.child(this.currentUser.uid).update({
          period5: newTeacherName
        });

      case 6:
        return this.userProfile.child(this.currentUser.uid).update({
          period6: newTeacherName
        });

      case 7:
        return this.userProfile.child(this.currentUser.uid).update({
          period7: newTeacherName
        });

      case 8:
        return this.userProfile.child(this.currentUser.uid).update({
          period8: newTeacherName
        });
    }
  }
}
