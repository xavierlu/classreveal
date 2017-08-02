import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, ApplicationRef } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireModule } from "angularfire2";

import { AuthData } from "../providers/auth-data";
import { ConnectivityService } from "../providers/ConnectivityService";
import { ProfileData } from "../providers/profile-data";
import { TeacherData } from "../providers/teacher-data";
import { SchoolData } from "../providers/school-data";
import { MyApp } from "./app.component";
import { TabsPage } from "../pages/tabs/tabs";
import { IntroPage } from "../pages/intro/intro";
import { HomePage } from "../pages/home/home";
import { SettingsPage } from "../pages/settings/settings";
import { LoginPage } from "../pages/login/login";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { SignupPage } from "../pages/signup/signup";
import { ListPage } from "../pages/list/list";
import { ListStudent } from "../pages/list-student/list-student";

import { EditProfile } from "../pages/editProfile/editProfile";

import { SchoolListPage } from "../pages/schoolList/schoolList";
import { TextAvatarDirective } from "../directives/text-avatar/text-avatar";

import { SocialSharing } from "@ionic-native/social-sharing";

export const firebaseConfig = {
  apiKey: "AIzaSyArtrcZzDp_OEquRaiwxPQ9K--Wx0fw0nU",
  authDomain: "classreveal-3146f.firebaseapp.com",
  databaseURL: "https://classreveal-3146f.firebaseio.com",
  projectId: "classreveal-3146f",
  storageBucket: "classreveal-3146f.appspot.com",
  messagingSenderId: "691736012118"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,
    IntroPage,
    HomePage,
    SettingsPage,
    ListPage,
    ListStudent,
    SchoolListPage,
    TextAvatarDirective,
    EditProfile
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,
    IntroPage,
    HomePage,
    SettingsPage,
    ListPage,
    ListStudent,
    SchoolListPage,
    EditProfile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData,
    ConnectivityService,
    ProfileData,
    TeacherData,
    SchoolData,
    StatusBar,
    SocialSharing,
    Network,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
