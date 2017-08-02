import { Component, ElementRef, ViewChild } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { AngularFire } from "angularfire2";
import { ListStudent } from "../list-student/list-student";
import { ProfileData } from "../../providers/profile-data";
import { ConnectivityService } from "../../providers/ConnectivityService";
import { ListPage } from "../list/list";
import firebase from "firebase";

@Component({ selector: "page-home", templateUrl: "home.html" })
export class HomePage {
  public userProfile: any;
  public inEditMode = false;
  private isLoading: boolean = false;

  // @ViewChild("1") sketchElement: ElementRef;

  COLORS: any[] = [
    "#e57373",
    "#f06292",
    "#ba68c8",
    "#9575cd",
    "#7986cb",
    "#64b5f6",
    "#4fc3f7",
    "#4dd0e1",
    "#4db6ac",
    "#81c784",
    "#aed581",
    "#ff8a65",
    "#d4e157",
    "#673ab7",
    "#ffb74d",
    "#a1887f",
    "#90a4ae"
  ];

  constructor(
    private alertCtrl: AlertController,
    private elementRef: ElementRef,
    public navCtrl: NavController,
    angFire: AngularFire,
    public profileData: ProfileData,
    public connectivityService: ConnectivityService
  ) {
    console.log("home page constructor");
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.profileData.getUserProfile().on("value", data => {
      this.userProfile = data.val();

      if (this.connectivityService.isOffline()) {
        let alert = this.alertCtrl.create({
          title: "Please check your network connection",
          buttons: [
            {
              text: "Fine"
            }
          ]
        });
        alert.present();
      }

      if (this.profileData.getUsersSchool() === "") {
        let alert = this.alertCtrl.create({
          title: "Please enter your school name in Settings",
          buttons: [
            {
              text: "Settings",
              handler: data => {
                alert.dismiss();

                this.navCtrl.parent.select(1);
              }
            }
          ]
        });
        alert.present();
      }
      this.isLoading = false;
    });
  }

  addClass() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Select Period");

    if (this.userProfile.period1 == "" || this.userProfile.period1 == null)
      alert.addInput({
        type: "radio",
        label: "Period 1",
        value: "1",
        checked: false
      });

    if (this.userProfile.period2 == "" || this.userProfile.period2 == null)
      alert.addInput({
        type: "radio",
        label: "Period 2",
        value: "2",
        checked: false
      });

    if (this.userProfile.period3 == "" || this.userProfile.period3 == null)
      alert.addInput({
        type: "radio",
        label: "Period 3",
        value: "3",
        checked: false
      });

    if (this.userProfile.period4 == "" || this.userProfile.period4 == null)
      alert.addInput({
        type: "radio",
        label: "Period 4",
        value: "4",
        checked: false
      });

    if (this.userProfile.period5 == "" || this.userProfile.period5 == null)
      alert.addInput({
        type: "radio",
        label: "Period 5",
        value: "5",
        checked: false
      });

    if (this.userProfile.period6 == "" || this.userProfile.period6 == null)
      alert.addInput({
        type: "radio",
        label: "Period 6",
        value: "6",
        checked: false
      });

    if (this.userProfile.period7 == "" || this.userProfile.period7 == null)
      alert.addInput({
        type: "radio",
        label: "Period 7",
        value: "7",
        checked: false
      });

    if (this.userProfile.period8 == "" || this.userProfile.period8 == null)
      alert.addInput({
        type: "radio",
        label: "Period 8",
        value: "8",
        checked: false
      });

    if (this.userProfile.period9 == "" || this.userProfile.period9 == null)
      alert.addInput({
        type: "radio",
        label: "Period 9",
        value: "9",
        checked: false
      });

    if (this.userProfile.period10 == "" || this.userProfile.period10 == null)
      alert.addInput({
        type: "radio",
        label: "Period 10",
        value: "10",
        checked: false
      });

    alert.addButton("Cancel");
    alert.addButton({
      text: "Next",
      handler: periodNumber => {
        console.log(+periodNumber);
        if (isNaN(+periodNumber)) {
          return;
        }

        var data = {
          period: +periodNumber,
          prevTeacher: this.profileData.getPeriod(+periodNumber)
        };
        if (this.profileData.getUsersSchool() === "") {
          let alert = this.alertCtrl.create({
            title: "Please enter your school name in Settings",
            buttons: [
              {
                text: "Settings",
                handler: data => {
                  this.navCtrl.parent.select(1);
                }
              }
            ]
          });
          alert.present();
        } else {
          if (!this.profileData.canEdit(periodNumber)) {
            let alert = this.alertCtrl.create({
              title:
                "Stop stalking your crush. You may only change your class once per session.",
              buttons: [
                {
                  text: "Fine I won't stalk"
                }
              ]
            });
            alert.present();
          } else {
            window.localStorage.setItem(
              "current-modifying-peroid",
              JSON.stringify(data)
            );
            this.navCtrl.push(ListPage);
          }
        }
      }
    });
    alert.present();
  }

  editTeacher(periodNumber: number) {
    console.log("EDIT TEACHER - " + this.profileData.canEdit(periodNumber));

    if (this.profileData.canEdit(periodNumber)) {
      console.log("in can edit");
      let alertToConfirm = this.alertCtrl.create({
        title:
          "Do you want to change this teacher? You may only do so once per session.",
        buttons: [
          {
            text: "Yes",
            handler: data1 => {
              var data = {
                period: +periodNumber,
                prevTeacher: this.profileData.getPeriod(+periodNumber)
              };
              if (this.profileData.getUsersSchool() === "") {
                let alert = this.alertCtrl.create({
                  title: "Please enter your school name in settings",
                  buttons: [
                    {
                      text: "Settings",
                      handler: data => {
                        this.navCtrl.parent.select(1);
                      }
                    }
                  ]
                });

                console.log("edited period" + periodNumber);
                alert.present();
              } else {
                //   this.profileData.edited(periodNumber);
                window.localStorage.setItem(
                  "current-modifying-peroid",
                  JSON.stringify(data)
                );
                this.navCtrl.push(ListPage);
              }
            }
          },
          {
            text: "No"
          }
        ]
      });
      alertToConfirm.present();
    } else {
      let alert = this.alertCtrl.create({
        title:
          "Stop stalking your crush. You may only change your class once per session.",
        buttons: [
          {
            text: "Fine I won't stalk"
          }
        ]
      });
      alert.present();
    }
  }

  removeTeacher(periodNumber: number) {
    var jsonData = JSON.parse(
      window.localStorage.getItem("current-modifying-peroid")
    );
    let alert = this.alertCtrl.create({
      message: "Unenroll Period" + periodNumber + " ?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "OK",
          handler: data => {
            this.profileData.updateTeacher(
              "",
              periodNumber,
              String(this.profileData.getPeriod(+periodNumber))
            );
          }
        }
      ]
    });
    alert.present();
  }

  viewClass(periodNumber: number): void {
    var data = {
      period: periodNumber
    };
    window.localStorage.setItem("current-viewing-period", JSON.stringify(data));
    this.navCtrl.push(ListStudent);
  }

  getColor(str: string): string {
    return this.COLORS[
      Math.abs(this.generateHashCode(str.replace("_", " "))) %
        this.COLORS.length
    ];
  }

  generateHashCode(str: string): number {
    let h = 0;
    if (str.length > 0) {
      for (let i = 0; i < str.length; i++) {
        h = 31 * h + str.charCodeAt(i);
        h |= 0; // Convert to 32bit integer
      }
    }
    return h;
  }
}
