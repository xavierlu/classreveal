import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ProfileData {
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
    public dataReference: any;
    
    public usersSchool = "";
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
    
constructor() {
    
     this.currentUser =  JSON.parse( window.localStorage.getItem('current-user')).thisUser;
    
   // this.currentUser = firebase.auth().currentUser;
    console.log("profData constructor: " + this.currentUser);
    this.userProfile = firebase.database().ref('/userProfile');
    this.dataReference = firebase.database();
        if(this.currentUser != null)
        {
        this.updateInfo(); }
  }
    
loadLocalStorage(){
    var data = {
        school: this.usersSchool,
        per1: this.period1,
        per2: this.period2,
        per3: this.period3,
        per4: this.period4,
        per5: this.period5,
        per6: this.period6,
        per7: this.period7,
        per8: this.period8,
        per9: this.period9,
        per10: this.period10
    };
    window.localStorage.setItem('current-user-data', JSON.stringify(data));
}
    
    setUser(user: any)
    {
        this.currentUser = user;
        //this.updateInfo();
        var data = {
            thisUser: user
    };
    window.localStorage.setItem('current-user', JSON.stringify(data));
    }
    
getUsersSchool(): String{
    return this.usersSchool;
}

getFirstName(): String{
    return this.firstName;
}
    
getLastName(): String{
    return this.lastName;
}
    
getPeriod(num : number): String
    {
        switch(num)
        {
            case 1:
                return this.period1;
            case 2:
                return this.period2;
            case 3:
                return this.period3;
            case 4:
                return this.period4;
            case 5:
                return this.period5;
            case 6:
                return this.period6;
            case 7:
                return this.period7;
            case 8:
                return this.period8;
            case 9:
                return this.period9;
            case 10:
                return this.period10;
        }
    }
    
    updateInfo()
    {
      
    console.log("updateinfo: " + this.currentUser.uid);
    console.log("firebase updateinfo: " +firebase.auth().currentUser.uid);  this.userProfile.child(this.currentUser.uid).once('value',(snapshot) => {
            if(snapshot.hasChild('schoolName'))
            {
                this.usersSchool = snapshot.val().schoolName;
            }
            if(snapshot.hasChild('period1'))
                {
                    this.period1 = snapshot.val().period1;
                }
            if(snapshot.hasChild('period2'))
                {
                    this.period2 = snapshot.val().period2;
                }
            if(snapshot.hasChild('period3'))
                {
                    this.period3 = snapshot.val().period3;
                }
            if(snapshot.hasChild('period4'))
                {
                    this.period4 = snapshot.val().period4;
                }
            if(snapshot.hasChild('period5'))
                {
                    this.period5 = snapshot.val().period5;
                }
            if(snapshot.hasChild('period6'))
                {
                    this.period6 = snapshot.val().period6;
                }
            if(snapshot.hasChild('period7'))
                {
                    this.period7 = snapshot.val().period7;
                }
            if(snapshot.hasChild('period8'))
                {
                    this.period8 = snapshot.val().period8;
                }
            if(snapshot.hasChild('period9'))
                {
                    this.period9 = snapshot.val().period9;
                }
            if(snapshot.hasChild('period10'))
                {
                    this.period10 = snapshot.val().period10;
                }
            if(snapshot.hasChild('firstName'))
                {
                    this.firstName = snapshot.val().firstName;
                console.log("updateInfo(): firstname " + this.firstName);
                }
            if(snapshot.hasChild('lastName'))
                {
                    this.lastName = snapshot.val().lastName;
                }


        });
    }

    
  getUserProfile(): firebase.database.Reference {
    console.log(this.currentUser.uid);
    console.log("firebase: " + firebase.auth().currentUser.uid);
      this.updateInfo
    this.currentUser = firebase.auth().currentUser;
          return this.userProfile.child(firebase.auth().currentUser.uid);
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
    const credential = firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      });
    });
  }

    updateSchool(newSchoolName: string): firebase.Promise<any>{

     

        this.dataReference.ref().child('schoolNames/').update({[newSchoolName]: 'true'});

        this.dataReference.ref('schoolData/' + newSchoolName).once('value', (snapshot) => {
                if(!snapshot.exists())
                {     
                    this.dataReference.ref().child('schoolData/').update({[newSchoolName]: {classData: 'true', teachers: 'true'}});
                }
          });

            this.usersSchool = newSchoolName;

            return this.userProfile.child(this.currentUser.uid).update({
                schoolName: newSchoolName
                });
    }
   
    addToSchools(newSchoolName: string)
    {
        
    }



updateTeacher(newTeacherName: string, periodNumber: number, prevTeacher: string): firebase.Promise<any> {
      
    if(prevTeacher !== "")
    {
        this.dataReference.ref('schoolData/' + this.usersSchool + '/classData/' + prevTeacher + '/period' + periodNumber).child(this.currentUser.uid).remove();
    }
    
    if(newTeacherName == "")
    {
        
    }
else{  
    this.dataReference.ref('schoolData/' + this.usersSchool + '/classData').once('value', (snapshot) => {
                if(snapshot.hasChild(newTeacherName))
                {     
                     this.dataReference.ref('schoolData/' + this.usersSchool + '/classData/' + newTeacherName).child('/period' + periodNumber).update({[this.currentUser.uid]: this.firstName + " " + this.lastName});
                }
                else 
                {
                    this.dataReference.ref('schoolData/' + this.usersSchool).child('/teachers').update({[newTeacherName]: 'true'});

                    this.dataReference.ref('schoolData/' + this.usersSchool).child('/classData').update({[newTeacherName]: {period1: 'true', period2: 'true', period3: 'true', period4: 'true', period5: 'true', period6: 'true', period7: 'true', period8: 'true', period9: 'true', period10: 'true'}});
                    
                    this.dataReference.ref('schoolData/' + this.usersSchool + '/classData/' + newTeacherName).child('/period' + periodNumber).update({[this.currentUser.uid]: this.firstName + " " + this.lastName});
                }
          });

}


      
    switch (periodNumber){
      case 1:
          this.period1 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period1: newTeacherName
        });

      case 2:
          this.period2 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period2: newTeacherName
        });

      case 3:
          this.period3 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period3: newTeacherName
        });

      case 4:
          this.period4 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period4: newTeacherName
        });

      case 5:
          this.period5 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period5: newTeacherName
        });

      case 6:
          this.period6 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period6: newTeacherName
        });

      case 7:
          this.period7 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period7: newTeacherName
        });

      case 8:
          this.period8 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period8: newTeacherName
        });
    case 9:
        this.period9 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period9: newTeacherName
        });
    case 10:
        this.period10 = newTeacherName;
        return this.userProfile.child(this.currentUser.uid).update({
          period10: newTeacherName
        });
    }

  }
}
