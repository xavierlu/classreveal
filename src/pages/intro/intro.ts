import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LoginPage } from "../login/login";
/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-intro",
  templateUrl: "intro.html"
})
export class IntroPage {
  constructor(public navCtrl: NavController) {}

  goToHome() {
    this.navCtrl.pop();
    this.navCtrl.setRoot(LoginPage);
  }

  slides = [
    {
      title: "Welcome to Class Reveal!",
      description: "<b>Class Reveal</b>blah blah blah blah.",
      image: "assets/pics/img-1.png"
    },
    {
      title: "Secure",
      description:
        "Class Reveal is secure bc we used <b>Google Firebase</b> blah blah blah blah blah",
      image: "assets/pics/img-5.png"
    },
    {
      title: "What is Ionic Cloud?",
      description:
        "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/pics/img-3.png"
    }
  ];
}
