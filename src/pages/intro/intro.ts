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
      description:
        "<b>Class Reveal</b> allows you to see who you share classes with!",
      image: "assets/pics/icon.png"
    },
    {
      title: "First thing...",
      description: "Input your <b>school</b> in settings",
      image: "assets/pics/school.png"
    },
    {
      title: "Social media",
      description:
        "Add your <b>social media</b> profiles to let your classmates contact you!",
      image: "assets/pics/user.png"
    },
    {
      title: "Add your classes",
      description: "Add your classes using your teacher's <b>full name</b>",
      image: "assets/pics/teacherApp.png"
    },
    {
      title: "Remember...",
      description:
        "You may only change each class period once per day. So <b>do not stalk</b> your classmates, and they won't stalk you back :)",
      image: "assets/pics/clock.png"
    },
    {
      title: "Have a schedule change?",
      description: "<b>Slide</b> to change your teacher or leave the class",
      image: "assets/pics/slideToEdit.png"
    },
    {
      title: "See who is in your class",
      description: "Click a class to <b>see your classmates</b>",
      image: "assets/pics/seeClassmates.png"
    }
  ];
}

// CREDITS: <div>Icons made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

// AND Freepik
