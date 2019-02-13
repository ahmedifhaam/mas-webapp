import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {logging} from "selenium-webdriver";
import Entry = logging.Entry;
import {pred} from "../_models/pred";

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private out: pred;

  constructor(private http:HttpClient) { }


  getlist(fabric:string,component:string,size:string){
    return this.http.get("/entries?fabric="+fabric+"&component="+component+"&size="+size);


  }

  predict(fabric:string,component:string,size:string,datain:string[]){
    this.out  = new pred();
    this.out['data'] = datain;
    this.out['fabric'] = fabric;
    this.out['component'] = component;
    this.out['size'] = size;
       // {"data": data,"fabric":fabric,"component":component,"size":size}
    return this.http.post<any>("/predict",this.out)
  }
}
