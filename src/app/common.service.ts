import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor( private fireStore:AngularFirestore) { }

  getCollections() {
   return this.fireStore.collection('cruds').snapshotChanges();
  }

  createNewItem(data) {
  return new Promise<any>((resolve, reject) =>{
    this.fireStore
        .collection("cruds")
        .add(data)
        .then(res => {
        }, err => reject(err));
        });
  }

  deleteCollection(data) {
       return this.fireStore
        .collection("cruds")
        .doc(data)
        .delete();
 }


 updateCollection(title, id) {
  return this.fireStore
  .collection('cruds')
  .doc(id)
  .update({title});
}

}
