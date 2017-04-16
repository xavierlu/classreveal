import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { TeacherData } from '../../providers/teacher-data';
import { ProfileData } from '../../providers/profile-data';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the teacher list page.
 * There is a search bar at the top.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
   selector: 'page-list',
   templateUrl: 'list.html'
 })
 export class ListPage {

     searchTerm: string = '';
     searchControl: FormControl;
     teachers: any;
     searching: any = false;

     constructor(public navCtrl: NavController, public profileData: ProfileData, public dataService: TeacherData) {
         this.searchControl = new FormControl();
     }

     ionViewDidLoad() {

         this.setFilteredItems();

         this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

             this.searching = false;
             this.setFilteredItems();

         });


     }

     onSearchInput(){
       this.searching = true;
     }

     setFilteredItems() {
       this.teachers = this.dataService.filterItems(this.searchTerm);
     }

     chooseTeacher(teacherName: string){
       var data = JSON.parse( window.localStorage.getItem('current-modifying-peroid'));
       this.profileData.updateTeacher(teacherName, data.period);
       this.navCtrl.pop();
     }
 }
