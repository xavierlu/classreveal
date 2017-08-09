import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NavController, AlertController } from "ionic-angular";
import { ProfileData } from "../../providers/profile-data";
import { SchoolData } from "../../providers/school-data";
import "rxjs/add/operator/debounceTime";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs/Rx";
import firebase from "firebase";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the school list page.
 * There is a search bar at the top.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-schoolList",
  templateUrl: "SchoolList.html"
})
export class SchoolListPage {
  searchTerm: string = "";
  searchControl: FormControl;
  schools: Observable<any>;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public profileData: ProfileData,
    public dataService: SchoolData,
    public angFire: AngularFire,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.searchControl = new FormControl();

    //this.setFilteredItems();
  }

  ionViewDidLoad() {
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.schools = this.angFire.database
      .list("schoolNames")
      .map(schools =>
        schools.filter(
          school =>
            school.$key
              .toLowerCase()
              .indexOf(this.searchTerm.replace(/ /g, "_").toLowerCase()) > -1
        )
      );
  }

  chooseSchool(schoolName: string) {
    if (schoolName === "" || this.isEmoji(schoolName)) {
      let alert = this.alertCtrl.create({
        title: "Please enter your school name or go back.",
        buttons: [
          {
            text: "Ok"
          }
        ]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: "Choose " + schoolName.replace(/_/g, " ") + " ?",
        message: "NOTE: You may not change your school later.",
        buttons: [
          {
            text: "No"
          },
          {
            text: "Yes",
            handler: data1 => {
              alert.dismiss();
              this.profileData.updateSchool(schoolName.replace(/ /g, "_"));
              this.storage.set(
                "canChangeSchool" + firebase.auth().currentUser.uid,
                false
              );
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
  }

  addSchool() {
    let alert = this.alertCtrl.create({
      title: "Add school",
      inputs: [
        {
          name: "schoolNameEntered",
          placeholder: "School name"
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
              input.schoolNameEntered.trim().length < 4 ||
              this.isEmoji(input.schoolNameEntered) ||
              this.profileData.containsBadword(input.schoolNameEntered)
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
              this.profileData
                .updateSchool(input.schoolNameEntered.replace(/ /g, "_"))
                .catch(error => {
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

              this.storage.set(
                "canChangeSchool" + firebase.auth().currentUser.uid,
                false
              );
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

  isEmoji(str: string) {
    if (str.match("[^a-zA-Z_ ]")) {
      return true;
    }
    return false;
  }
}
