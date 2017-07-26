import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {ProfileData} from '../providers/profile-data';

@Injectable()
export class AuthData {
  constructor(public profileData : ProfileData) {}

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email : string, password : string) : firebase.Promise < any > {
    if(firebase.auth().currentUser == null) {
      console.log("loginUser: current user is null!");
    } else {
      console.log("login user");
      console.log(firebase.auth().currentUser.uid);
    }
    this
      .profileData
      .updateUser();
    console.log(email + " " + password);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(email : string, password : string, firstname : string, lastname : string) : firebase.Promise < any > {
    if(firebase.auth().currentUser == null) {
      console.log("current user is null!");
    } else {
      console.log(firebase.auth().currentUser.uid);
    }

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.uid)
          .set({email: email, firstName: firstname, lastName: lastname});
      });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email : string) : firebase.Promise < any > {
    return firebase
      .auth()
      .sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser() : firebase.Promise < any > {
    if(firebase.auth().currentUser == null) {
      console.log("current user is null!");
    } else {
      console.log("logging out " + firebase.auth().currentUser.uid);
    }

    return firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('Signed Out');

      }, function (error) {
        console.error('Sign Out Error', error);
      });
  }

  deleteUser() {
    var user = firebase
      .auth()
      .currentUser;

    user
      .delete()
      .then(function () {
        console.log('yyyyaaaa');
      }, function (error) {
        console.log('3rror:' + error);
      });
  }

}
