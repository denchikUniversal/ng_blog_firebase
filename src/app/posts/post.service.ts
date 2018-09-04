import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Post } from './post';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private afs:AngularFirestore) { 
    this.postsCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc'))
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(map( actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return { id, ...data}
      })
    }))
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`)
    return this.postDoc.valueChanges()
  }
}
