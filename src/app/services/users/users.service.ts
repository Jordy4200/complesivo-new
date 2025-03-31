import { Injectable } from '@angular/core';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async loadUserInFirebase() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const userRef = doc(this.firestore, "users", user.uid);
    const userData = getDoc(userRef);
    if(await userData.then(doc => doc.exists())) return;
    setDoc(userRef, {
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      role: "user"
    });
  }

  getCurrentUser(){
    const user = this.authService.getCurrentUser();
    if (!user) return null;
    const userRef = doc(this.firestore, "users", user.uid);
    return getDoc(userRef).then(doc => doc.data());
  }
}
