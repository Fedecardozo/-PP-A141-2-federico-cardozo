import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  Unsubscribe,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  private unSuscribe?: Unsubscribe;
  correo: string | null | undefined = undefined;

  constructor() {
    this.unSuscribe = this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        console.log(auth.email);
        this.correo = this.auth.currentUser?.email;
      } else {
        this.correo = null;
      }
    });
  }
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  cerrarSesion() {
    return this.auth.signOut();
  }
}
