import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NavController, AlertController } from "ionic-angular";
import { TeacherData } from "../../providers/teacher-data";
import { ProfileData } from "../../providers/profile-data";
import { ConnectivityService } from "../../providers/ConnectivityService";
import "rxjs/add/operator/debounceTime";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs/Rx";

/**
 * Generated class for the teacher list page.
 * There is a search bar at the top.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({ selector: "page-list", templateUrl: "list.html" })
export class ListPage {
  searchTerm: string = "";
  searchControl: FormControl;
  teachers: Observable<any>;
  searching: boolean = false;
  school: String;

  constructor(
    public navCtrl: NavController,
    public profileData: ProfileData,
    public dataService: TeacherData,
    public angFire: AngularFire,
    public alertCtrl: AlertController,
    public connectivityService: ConnectivityService
  ) {
    this.searchControl = new FormControl();
    this.school = this.profileData.getUsersSchool();
    //  console.log("SCHOOL - " + this.school);
  }

  ionViewDidLoad() {
    this.setFilteredItems();

    if (this.connectivityService.isOffline()) {
      let alert = this.alertCtrl.create({
        title: "Please check your network connection",
        buttons: [
          {
            text: "OK"
          }
        ]
      });
      alert.present();
    }

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.teachers = this.angFire.database
      .list("schoolData/" + this.school + "/teachers")
      .map(schools =>
        schools.filter(
          school =>
            school.$key
              .toLowerCase()
              .indexOf(this.searchTerm.replace(" ", "_").toLowerCase()) > -1
        )
      );
  }

  removeTeacher() {
    var data = JSON.parse(
      window.localStorage.getItem("current-modifying-peroid")
    );

    this.profileData.updateTeacher("", data.period, data.prevTeacher);
    this.navCtrl.pop();
  }

  chooseTeacher(teacherName: string) {
    teacherName = teacherName.replace("_", " ");

    let alert = this.alertCtrl.create({
      message: "Choose " + teacherName + " ?",
      buttons: [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: data1 => {
            var data = JSON.parse(
              window.localStorage.getItem("current-modifying-peroid")
            );
            
              teacherName = teacherName.trim().replace(" ", "_");
            if (teacherName === "" || teacherName.split("_").length < 2) {
              let alert = this.alertCtrl.create({
                title: "Please enter your teacher's full name or go back.",
                buttons: [
                  {
                    text: "Ok"
                  }
                ]
              });
              alert.present();
            } else {
                if(data.prevTeacher !== teacherName)
                {
                  this.profileData.edited(data.period);
                  this.profileData.updateTeacher(
                    teacherName,
                    data.period,
                    data.prevTeacher
                    ); 
                }
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

  addTeacher() {
    var data = JSON.parse(
      window.localStorage.getItem("current-modifying-peroid")
    );

    let alert = this.alertCtrl.create({
      title: "Add Teacher",
      inputs: [
        {
          name: "teacherFirstName",
          placeholder: "First name"
        },
        {
          name: "teacherLastName",
          placeholder: "Last name"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: input => {
            if (
                input.teacherFirstName.trim().split(" ").length > 1 ||
                input.teacherLastName.trim().split(" ").length > 1 ||
              this.isEmoji(input.teacherFirstName) ||
              this.isEmoji(input.teacherLastName) || input.teacherFirstName.indexOf("fuck") >= 0 || input.teacherFirstName.indexOf("ass") >= 0 || input.teacherFirstName.indexOf("bitch") >= 0 || input.teacherFirstName.indexOf("pussy") >= 0 || input.teacherLastName.indexOf("fuck") >= 0 || input.teacherLastName.indexOf("ass") >= 0 || input.teacherLastName.indexOf("bitch") >= 0 || input.teacherLastName.indexOf("pussy") >= 0 || (input.teacherLastName + " ").indexOf("dick ") >= 0 || (input.teacherFirstName + " ").indexOf("dick ") >= 0
            ) {
              let alert2 = this.alertCtrl.create({
                message: "Dude stop",
                buttons: [
                  {
                    text: "OK",
                    role: "cancel"
                  }
                ]
              });
              alert2.present();
            } else {
              var temp = this.capitalizeFirstLetter(input.teacherFirstName.trim()) +"_" +this.capitalizeFirstLetter(input.teacherLastName.trim());
              
                
              this.profileData.updateTeacher(temp, data.period, data.prevTeacher).catch(error => {
                  let alert2 = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                      {
                        text: "OK",
                        role: "cancel"
                      }
                    ]
                  });
                  alert2.present();
                });
                this.profileData.edited(data.period);
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  isEmoji(str: string) {
    var ranges = [
      "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
      "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
      "\ud83d[\ude80-\udeff]" // U+1F680 to U+1F6FF
    ];
    return str.match(ranges.join("|"));
  }
}
