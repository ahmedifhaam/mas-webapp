import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from "../_models/user";
import {entry} from "../_models/entry";
import {EntryService} from "../_services/entry.service";
import {logging} from "selenium-webdriver";
import Entry = logging.Entry;
import {FileItem, FileUploader} from "ng2-file-upload";


const URL = '/uploadFile';

@Component({templateUrl: 'home.component.html',styleUrls:['home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  entries : entry[] =[];
  component:string = "";
  components:string[] = ["Body","Arm"]
  fabric:string = "";
  fabrics:string[] = ['Type_a','Type_b','Type_c']
  size:string = "";
  sizes:string[] = ['s','m','l']
  fileuploadedName:string="";
  dpupdatesuccess:boolean=false;
  fileType:string="";
  filesize:number=0;

  prediction_vals:string[] = ["0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0",
    "0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0"]

  predictedvals = {"length":{"predicted_val":0.0,"mae":0.0},"width":{"predicted_val":0.0,"mae":0.0},"data":[]}


  public uploader: FileUploader = new FileUploader({ url : URL, itemAlias: 'file'});

  constructor(private entryserivice:EntryService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {


    this.uploader.onBuildItemForm = (fileitem:any,form:any) =>{
      form.append('component',this.component)
      form.append('fabric',this.fabric)
      form.append('size',this.size)
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      response = JSON.parse(response);
      this.fileuploadedName = response['fileName']
      this.filesize = response['size']
      this.fileType = response['fileType']
      this.dpupdatesuccess = response['dbupdatedsuccessfully']
      alert('File uploaded successfully');
      this.refreshEntries("");
    };
  }

  public refreshEntries(event:any){
    this.loadentries(this.fabric,this.component,this.size);
  }

  private loadentries(fabric:string,component:string,size:string){
    if(fabric && component && size){
      this.entryserivice.getlist(fabric, component, size).subscribe((value :entry[])=> {
        this.entries = value;
      });
    }

  }

  public predict_values() {
    this.entryserivice.predict(this.fabric, this.component, this.size, this.prediction_vals).subscribe(value => {
      this.predictedvals = value;
    }, error1 => {
      alert("Not enought data to perform the request");
    });
  }
}
