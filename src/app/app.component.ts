import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { CommonService } from './common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  collections = <any>[];
  edit = false;
  data;

  constructor( private commonService: CommonService) {}
  
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });


ngOnInit() {
    this.getCollections();
  }

  getCollections() {
    this.commonService.getCollections()
    .subscribe(res => {
      this.collections = res;
    })
  }

onSubmit() {
  if(!this.edit) {
    const val = this.form.value.title;
      if(val && val.length>0) {
        this.commonService.createNewItem({title: val});
        this.form.value.title = '';
      }
  } else {
    this.commonService.updateCollection(this.form.value.title, this.data.payload.doc.id);
    this.getCollections();
    this.form.reset();
    this.edit = false;
  }
}
    deleteItem(data) {
      this.commonService.deleteCollection(data.payload.doc.id);
    }

    updateItem(data) {
      this.edit = true;
      this.form.value.title = data.payload.doc.data().title;
      this.data = data;
    }
}
