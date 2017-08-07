import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Storage } from "@ionic/storage";

@Injectable()
export class ProfileData {
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User = null;
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
  public twitter = "";
  public instagram = "";
  public snapchat = "";
  public email = "";
  public grade = 1;
  private studentInitialCount = 1;
  constructor(private storage: Storage) {
    // this.currentUser = firebase.auth().currentUser;
    firebase.initializeApp({
      apiKey: "AIzaSyArtrcZzDp_OEquRaiwxPQ9K--Wx0fw0nU",
      authDomain: "classreveal-3146f.firebaseapp.com",
      databaseURL: "https://classreveal-3146f.firebaseio.com",
      projectId: "classreveal-3146f",
      storageBucket: "classreveal-3146f.appspot.com",
      messagingSenderId: "691736012118"
    });

    console.log("profData constructor: ");

    this.userProfile = firebase.database().ref("/userProfile");

    this.dataReference = firebase.database();

    if (this.currentUser != null) {
      this.updateInfo();
    }
  }

  canEdit(num: number): boolean {
    try {
      this.storage.get("period-" + num + this.currentUser.uid).then(val => {
        console.log("val " + val);
        if (val == null || val == undefined) {
          return true;
        }
        console.log((Math.round(new Date().getTime() / 1000) - val) / 86400);
        try {
          return (Math.round(new Date().getTime() / 1000) - val) / 86400 >= 1;
        } catch (e) {
          return true;
        }
      });
    } catch (e) {
      return false;
    }
  }

  edited(num: number) {
    var data = {
      timestamp: Math.round(new Date().getTime() / 1000)
    };

    this.storage.set("period-" + num + this.currentUser.uid, data.timestamp);
  }

  isAdmin(): boolean {
    return (
      this.currentUser.email === "elizabeth.petrov@gmail.com" ||
      this.currentUser.email === "xllgms@gmail.com" ||
      this.currentUser.email === "sergrl127@gmail.com"
    );
  }

  loadLocalStorage() {
    console.log("LOCAL STORAGE");

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
      per10: this.period10,
      twitter: this.twitter,
      instagram: this.instagram,
      snapchat: this.snapchat,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };
    console.log(data);
    window.localStorage.setItem("current-user-data", JSON.stringify(data));
  }

  updateUser() {
    console.log("in updateUSer / profdata");
    this.currentUser = firebase.auth().currentUser;
    if (this.currentUser != null) {
      this.updateInfo();
    }
    console.log("this.currentUser = " + this.currentUser);
  }

  getUsersSchool(): String {
    return this.usersSchool;
  }

  getFirstName(): String {
    return this.firstName;
  }

  getLastName(): String {
    return this.lastName;
  }

  getPeriod(num: number): String {
    switch (num) {
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

  updateInfo() {
    this.currentUser = firebase.auth().currentUser;
    console.log("UPDATE INFO");
    this.userProfile.child(this.currentUser.uid).once("value", snapshot => {
      if (snapshot.hasChild("schoolName")) {
        this.usersSchool = snapshot.val().schoolName;
      }
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
        console.log("updateInfo(): firstname " + this.firstName);
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
      if (snapshot.hasChild("email")) {
        this.email = snapshot.val().email;
      }
      this.loadLocalStorage();
    });
  }

  clearInfo() {
    console.log("CLEAR INFO");
    this.usersSchool = "";
    this.period1 = "";
    this.period2 = "";
    this.period3 = "";
    this.period4 = "";
    this.period5 = "";
    this.period6 = "";
    this.period7 = "";
    this.period8 = "";
    this.period9 = "";
    this.period10 = "";
    this.firstName = "";
    this.lastName = "";
    this.snapchat = "";
    this.instagram = "";
    this.twitter = "";
    this.email = "";
    this.loadLocalStorage();
  }

  getUserProfile(): firebase.database.Reference {
    console.log(this.currentUser.uid);
    console.log("firebase: " + firebase.auth().currentUser.uid);
    //  this.updateInfo();
    this.currentUser = firebase.auth().currentUser;

    return this.userProfile.child(firebase.auth().currentUser.uid);
  }

  updateSnapchat(snap: string): firebase.Promise<any> {
    this.snapchat = snap;
    this.loadLocalStorage();

    return this.userProfile
      .child(this.currentUser.uid)
      .update({ snapchat: snap });
  }

  updateTwitter(snap: string): firebase.Promise<any> {
    this.twitter = snap;
    this.loadLocalStorage();
    return this.userProfile
      .child(this.currentUser.uid)
      .update({ twitter: snap });
  }

  updateInstagram(snap: string): firebase.Promise<any> {
    this.instagram = snap;
    this.loadLocalStorage();
    return this.userProfile
      .child(this.currentUser.uid)
      .update({ instagram: snap });
  }

  updateName(firstName1: string, lastName1: string): firebase.Promise<any> {
    console.log(this.isEmoji(firstName1) + " " + firstName1);
    if (this.isEmoji(firstName1) || this.isEmoji(lastName1)) {
      throw new Error("Not a valid name.");
    }
    this.firstName = firstName1;
    this.lastName = lastName1;
    this.loadLocalStorage();
    return this.userProfile
      .child(this.currentUser.uid)
      .update({ firstName: firstName1, lastName: lastName1 });
  }

  updateGrade(gradeNumber: number): firebase.Promise<any> {
    this.grade = gradeNumber;
    this.loadLocalStorage();
    return this.userProfile
      .child(this.currentUser.uid)
      .update({ grade: gradeNumber });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    this.email = newEmail;
    this.loadLocalStorage();

    return this.currentUser.reauthenticate(credential).then(user => {
      this.currentUser.updateEmail(newEmail).then(user => {
        this.userProfile
          .child(this.currentUser.uid)
          .update({ email: newEmail });
      });
    });
  }

  updatePassword(
    oldPassword: string,
    newPassword: string
  ): firebase.Promise<any> {
    if (this.isEmoji(newPassword)) {
      throw new Error("No emoji please");
    }
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser.reauthenticate(credential).then(user => {
      this.currentUser.updatePassword(newPassword).then(user => {
        console.log("Password Changed");
      });
    });
  }

  updateSchool(newSchoolName: string): firebase.Promise<any> {
    if (this.isEmoji(newSchoolName)) {
      throw new Error("No emoji please");
    }

    if (!(this.usersSchool === newSchoolName)) {
      //the newSchool is dif, so update everything
      console.log("CHANGED TO NEW SCHOOL");
        this.usersSchool = newSchoolName.replace(" ", "_");
      this.loadLocalStorage();

      for (var i = 1; i <= 10; i++) {
        this.updateTeacher("", i, String(this.getPeriod(+i)));
      }

      this.dataReference
        .ref()
        .child("schoolNames/")
        .update({ [newSchoolName]: "true" });

      this.dataReference
        .ref("schoolData/" + newSchoolName)
        .once("value", snapshot => {
          if (!snapshot.exists()) {
            //if school is new to database
            this.dataReference.ref().child("schoolData/").update({
              [newSchoolName]: {
                classData: "true",
                teachers: "true"
              }
            });
          }
        });
    }

    return this.userProfile
      .child(this.currentUser.uid)
      .update({ schoolName: newSchoolName });
  }

  updateTeacher(
    newTeacherName: string,
    periodNumber: number,
    prevTeacher: string
  ): firebase.Promise<any> {
    console.log("prevTeacher = " + prevTeacher);
    console.log("newTeacher = " + newTeacherName);

    var schoolOfUser = this.usersSchool;
    var tempDataref = this.dataReference;

    if (prevTeacher !== "") {
      //already has teacher. need to take out of that class

      this.dataReference
        .ref(
          "schoolData/" +
            this.usersSchool +
            "/classData/" +
            prevTeacher +
            "/period" +
            periodNumber
        )
        .child(this.currentUser.uid)
        .remove();

      //need to check student count here and delete if needed/decrement count

      var databaseRef = firebase
        .database()
        .ref("schoolData/" + schoolOfUser + "/classData/" + prevTeacher);
      var removeTeacherNeeded = false;
      var noStudent = false;

      // console.log("removeTeacherNeeded0 = " + removeTeacherNeeded);
      databaseRef
        .child("students")
        .transaction(function(students) {
          console.log("TRANSACTION IF PREV TEACHER -> students: " + students);

          if (students || 0) {
            students = students - 1;
          }

          return students;
        })
        .then(
          function(val) {
            // All promises succeeded.

            databaseRef.once("value").then(function(snapshot) {
              console.log("read students: " + snapshot.val().students);
              if (snapshot.val().students <= 0) {
                tempDataref
                  .ref("schoolData/" + schoolOfUser + "/classData/")
                  .child(prevTeacher)
                  .remove();
                tempDataref
                  .ref("schoolData/" + schoolOfUser + "/teachers")
                  .child(prevTeacher)
                  .remove();
              }
            });

            if (noStudent) {
              console.log("in no students");
              tempDataref
                .ref("schoolData/" + schoolOfUser + "/classData")
                .child(prevTeacher)
                .update({ students: 0 });
            }
            // console.log("removeTeacherNeeded2 = " + removeTeacherNeeded);
          },
          function(error) {
            // Something went wrong.
            console.error(error);
          }
        );
    }

    if (newTeacherName == "") {
      //nothing to change here
    } else {
      //has new teacher

      this.dataReference
        .ref("schoolData/" + this.usersSchool + "/classData")
        .once("value", snapshot => {
          if (snapshot.hasChild(newTeacherName)) {
            //has the teacher already

            this.dataReference
              .ref(
                "schoolData/" +
                  this.usersSchool +
                  "/classData/" +
                  newTeacherName
              )
              .child("/period" + periodNumber)
              .update({
                [this.currentUser.uid]: this.firstName + " " + this.lastName
              });

            //add 1 to student count

            var databaseRef2 = firebase
              .database()
              .ref(
                "schoolData/" +
                  this.usersSchool +
                  "/classData/" +
                  newTeacherName
              )
              .child("students");

            databaseRef2.transaction(students => {
              console.log("TRANSACTION 2 -> students = " + students);

              if (students || 0) {
                students = students + 1;
              }
              console.log("students after add = " + students);
              return students;
            });
          } else {
            //adding a teacher not in the database

            this.dataReference
              .ref("schoolData/" + this.usersSchool)
              .child("/teachers")
              .update({
                [newTeacherName]: "true"
              });

            this.dataReference
              .ref("schoolData/" + this.usersSchool)
              .child("/classData")
              .update({
                [newTeacherName]: {
                  period1: "true",
                  period2: "true",
                  period3: "true",
                  period4: "true",
                  period5: "true",
                  period6: "true",
                  period7: "true",
                  period8: "true",
                  period9: "true",
                  period10: "true",
                  students: this.studentInitialCount
                }
              });

            this.dataReference
              .ref(
                "schoolData/" +
                  this.usersSchool +
                  "/classData/" +
                  newTeacherName
              )
              .child("/period" + periodNumber)
              .update({
                [this.currentUser.uid]: this.firstName + " " + this.lastName
              });
          }
        }); //close snapshot
    } //close else

    //set in user's profile
    switch (periodNumber) {
      case 1:
        this.period1 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period1: newTeacherName });

      case 2:
        this.period2 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period2: newTeacherName });

      case 3:
        this.period3 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period3: newTeacherName });

      case 4:
        this.period4 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period4: newTeacherName });

      case 5:
        this.period5 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period5: newTeacherName });

      case 6:
        this.period6 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period6: newTeacherName });

      case 7:
        this.period7 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period7: newTeacherName });

      case 8:
        this.period8 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period8: newTeacherName });
      case 9:
        this.period9 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period9: newTeacherName });
      case 10:
        this.period10 = newTeacherName;
        this.loadLocalStorage();
        return this.userProfile
          .child(this.currentUser.uid)
          .update({ period10: newTeacherName });
    }
  }

  deleteUser() {
    try {
      this.userProfile.child(this.currentUser.uid).remove();
    } catch (e) {
      console.log(e);
    }
  }

  isEmoji(str: string) {
    var ranges = [
      "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
      "\ud83d[\udc00-\udeff]", // U+1F400 to U+1F6FF
      "\ud83d[\ude80-\udeff]", // U+1F680 to U+1F6FF
      '[$-/:-?{-~!"^_`[]]',
      "[\u2600-\u27ff]"
    ];
    return str.match(ranges.join("|"));
  }

  inPrepopulateMode(prepopulate: boolean) {
    if (prepopulate) {
      this.studentInitialCount = 2;
    } else {
      this.studentInitialCount = 1;
    }
  }

  containsBadword(str: string): boolean {
    var substrings = [
      "4r5e",
      "5h1t",
      "5hit",
      "a55",
      "anal",
      "anus",
      "ar5e",
      "arrse",
      "arse",
      "asshole",
      "asswhole",
      "a_s_s",
      "b!tch",
      "b00bs",
      "b17ch",
      "b1tch",
      "ballbag",
      "balls",
      "ballsack",
      "bastard",
      "beastial",
      "beastiality",
      "bellend",
      "bestial",
      "bestiality",
      "bi+ch",
      "biatch",
      "bitch",
      "bloody",
      "blowjob",
      "boiolas",
      "bollock",
      "bollok",
      "boner",
      "boob",
      "boobs",
      "booobs",
      "boooobs",
      "booooobs",
      "booooooobs",
      "boooooooobs",
      "booooooooobs",
      "breasts",
      "buceta",
      "bugger",
      "bum",
      "bunny fucker",
      "butt",
      "c0ck",
      "c0cksucker",
      "cawk",
      "chink",
      "cipa",
      "cl1t",
      "clit",
      "clitoris",
      "clits",
      "cnut",
      "cock",
      "cock-sucker",
      "cockface",
      "cockhead",
      "cockmunch",
      "cockmuncher",
      "cocks",
      "cok",
      "cokmuncher",
      "coksucka",
      "coon",
      "cox",
      "crap",
      "cum",
      "cummer",
      "cumming",
      "cums",
      "cumshot",
      "cunilingus",
      "cunillingus",
      "cunnilingus",
      "cunt",
      "cuntlick",
      "cuntlicker",
      "cuntlicking",
      "cunts",
      "cyalis",
      "cyberfuc",
      "cyberfuck",
      "cyberfucked",
      "cyberfucker",
      "cyberfuckers",
      "cyberfucking",
      "d1ck",
      "damn",
      "dick",
      "dickhead",
      "dildo",
      "dildos",
      "dink",
      "dinks",
      "dirsa",
      "dlck",
      "dog-fucker",
      "doggin",
      "dogging",
      "donkeyribber",
      "doosh",
      "duche",
      "dyke",
      "ejaculate",
      "ejaculated",
      "ejaculates",
      "ejaculating",
      "ejaculatings",
      "ejaculation",
      "ejakulate",
      "f4nny",
      "fag",
      "fagging",
      "faggitt",
      "faggot",
      "faggs",
      "fagot",
      "fagots",
      "fags",
      "fanny",
      "fannyflaps",
      "fannyfucker",
      "fanyy",
      "fatass",
      "fcuk",
      "fcuker",
      "fcuking",
      "feck",
      "fecker",
      "felching",
      "fellate",
      "fellatio",
      "fingerfuck",
      "fingerfucked",
      "fingerfucker",
      "fingerfuckers",
      "fingerfucking",
      "fingerfucks",
      "fistfuck",
      "fistfucked",
      "fistfucker",
      "fistfuckers",
      "fistfucking",
      "fistfuckings",
      "fistfucks",
      "flange",
      "fook",
      "fooker",
      "fuck",
      "fudgepacker",
      "fuk",
      "fux",
      "fux0r",
      "f_u_c_k",
      "gangbang",
      "gangbanged",
      "gangbangs",
      "gaylord",
      "gaysex",
      "goatse",
      "God",
      "god-dam",
      "god-damned",
      "goddamn",
      "goddamned",
      "hardcoresex",
      "hell",
      "heshe",
      "hoar",
      "hoare",
      "hoer",
      "homo",
      "hore",
      "horniest",
      "horny",
      "hotsex",
      "jack-off",
      "jackoff",
      "jap",
      "jerk-off",
      "jism",
      "jiz",
      "jizm",
      "jizz",
      "kawk",
      "knob",
      "kock",
      "kondum",
      "kondums",
      "kum",
      "kummer",
      "kumming",
      "kums",
      "kunilingus",
      "l3i+ch",
      "l3itch",
      "labia",
      "lust",
      "lusting",
      "m0f0",
      "m0fo",
      "m45terbate",
      "ma5terb8",
      "ma5terbate",
      "masochist",
      "master-bate",
      "masterb8",
      "masterbat",
      "mo-fo",
      "mof0",
      "mofo",
      "mothafuck",
      "mother fucker",
      "motherfuck",
      "motherfucked",
      "motherfucker",
      "motherfuckers",
      "motherfuckin",
      "motherfucking",
      "motherfuckings",
      "motherfuckka",
      "motherfucks",
      "muff",
      "mutha",
      "muthafecker",
      "muthafuckker",
      "muther",
      "mutherfucker",
      "n1gga",
      "n1gger",
      "nazi",
      "nigg3r",
      "nigg4h",
      "nigga",
      "niggah",
      "niggas",
      "niggaz",
      "nigger",
      "niggers",
      "nob",
      "nob jokey",
      "nobhead",
      "nobjocky",
      "nobjokey",
      "numbnuts",
      "nutsack",
      "orgasim",
      "orgasims",
      "orgasm",
      "orgasms",
      "p0rn",
      "pawn",
      "pecker",
      "penis",
      "penisfucker",
      "phonesex",
      "phuck",
      "phuk",
      "phuked",
      "phuking",
      "phukked",
      "phukking",
      "phuks",
      "phuq",
      "pigfucker",
      "pimpis",
      "piss",
      "pissed",
      "pisser",
      "pissers",
      "pisses",
      "pissflaps",
      "pissin",
      "pissing",
      "pissoff",
      "poop",
      "porn",
      "porno",
      "pornography",
      "pornos",
      "prick",
      "pricks",
      "pron",
      "pube",
      "pusse",
      "pussi",
      "pussies",
      "pussy",
      "pussys",
      "rectum",
      "retard",
      "rimjaw",
      "rimming",
      "s hit",
      "s.o.b.",
      "sadist",
      "schlong",
      "screwing",
      "scroat",
      "scrote",
      "scrotum",
      "semen",
      "sex",
      "sh!+",
      "sh!t",
      "sh1t",
      "shag",
      "shagger",
      "shaggin",
      "shagging",
      "shemale",
      "shi+",
      "shit",
      "shitdick",
      "shite",
      "shited",
      "shitey",
      "shitfuck",
      "shitfull",
      "shithead",
      "shiting",
      "shitings",
      "shits",
      "shitted",
      "shitter",
      "shitters",
      "shitting",
      "shittings",
      "shitty",
      "skank",
      "slut",
      "sluts",
      "smegma",
      "smut",
      "snatch",
      "son-of-a-bitch",
      "spac",
      "spunk",
      "s_h_i_t",
      "t1tt1e5",
      "t1tties",
      "teets",
      "teez",
      "testical",
      "testicle",
      "tit",
      "titfuck",
      "tits",
      "titt",
      "tittie5",
      "tittiefucker",
      "titties",
      "tittyfuck",
      "tittywank",
      "titwank",
      "tosser",
      "turd",
      "tw4t",
      "twat",
      "twathead",
      "twatty",
      "twunt",
      "twunter",
      "v14gra",
      "v1gra",
      "vagina",
      "viagra",
      "vulva",
      "w00se",
      "wang",
      "wank",
      "wanker",
      "wanky",
      "whoar",
      "whore",
      "willies",
      "willy",
      "xrated",
      "xxx"
    ];
    console.log(str);
    if (
      substrings.some(function(v) {
        return str.toLowerCase().indexOf(v) >= 0;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }
}
