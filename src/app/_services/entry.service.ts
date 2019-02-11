import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {logging} from "selenium-webdriver";
import Entry = logging.Entry;

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http:HttpClient) { }


  getlist(){
    return this.http.get("/entries");


  }
}
