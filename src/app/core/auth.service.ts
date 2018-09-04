import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe( data => this.authState = data)
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
