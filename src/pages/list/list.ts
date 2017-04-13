import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { TeacherData } from '../../providers/teacher-data';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the teacher list page.
 * There will be a search bar at the top.
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

     constructor(public navCtrl: NavController, public dataService: TeacherData) {
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

     consolePrint(text: string){
       console.log(text);
     }
 }
