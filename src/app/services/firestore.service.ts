import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Pregunta } from '../interfaces/Preguntas.interface';
import { deleteDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private coleccionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private auth: Auth) { 
    this.coleccionRef = collection(this.firestore, 'preguntas');
  }

   getQuestions(): Observable<Pregunta[]> {
    return collectionData(this.coleccionRef, { idField: 'id' }) as Observable<Pregunta[]>;
  }

  deleteQuestion(id: string): Promise<void> {
  const preguntaDocRef = doc(this.firestore, `preguntas/${id}`);
  return deleteDoc(preguntaDocRef);
}

  updateQuestion(id: string, data: Partial<Pregunta>): Promise<void> {
  const preguntaDocRef = doc(this.firestore, `preguntas/${id}`);
  return updateDoc(preguntaDocRef, data);
}

// Login

 login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }


  isLoggedIn(): boolean {
  return !!localStorage.getItem('user'); // o el token
}
}
