import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  books: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.books = angFire.database.list('/Books');
  }

  addBook(): void {
    let prompt = this.alertCtrl.create({
      title: 'Add a book',
      message: 'Enter stuff',
      inputs: [
      {
        name: 'title',
        placeholder: "Book Title"
      },
      {
        name: 'author',
        placeholder: "Author's name"
      }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancelled");
          }
        },
        {
          text: "Submit",
          handler: data => {
            this.books.push({
              title: data.title,
              author: data.author
            })
          }
        }
      ]
    });
    prompt.present();
  }

  editBook(book): void {
    let prompt = this.alertCtrl.create({
      title: 'Add a book',
      message: 'Edit stuff',
      inputs: [
      {
        name: 'title',
        placeholder: book.title
      },
      {
        name: 'author',
        placeholder: book.author
      }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancelled");
          }
        },
        {
          text: "Submit",
          handler: data => {
            let newTitle:String = book.title;
            let newAuthor:String = book.author;

            if(data.title != ''){
              newTitle = data.title;
            }

            if(data.author != ''){
              newAuthor = data.author;
            }

            this.books.update(book.$key, {
              title: newTitle,
              author: newAuthor
            })
          }
        }
      ]
    });
    prompt.present();
  }

  deleteBook(bookID): void {
    let prompt = this.alertCtrl.create({
      title: 'Remove this book?',
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancelled");
          }
        },
        {
          text: "Remove",
          handler: data => {
            this.books.remove(bookID)
          }
        }
      ]
    });
    prompt.present();
  }
}
