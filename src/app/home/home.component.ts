import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from "../_models/user";
import {entry} from "../_models/entry";
import {EntryService} from "../_services/entry.service";
import {logging} from "selenium-webdriver";
import Entry = logging.Entry;



@Component({templateUrl: 'home.component.html',styleUrls:['home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  entries : entry[] =[]

  constructor(private entryserivice:EntryService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // this.loadAllUsers();
    this.loadentries();
  }

  deleteUser(id: number) {
    // this.userService.delete(id).pipe(first()).subscribe(() => {
    //   // this.loadAllUsers()
    // });
  }

  private loadentries(){
   this.entryserivice.getlist().subscribe((value :entry[])=> {
      this.entries = value;
    });
  }

  // private loadAllUsers() {
  //   this.userService.getAll().pipe(first()).subscribe(users => {
  //     this.users = users;
  //   });
  // }
}
