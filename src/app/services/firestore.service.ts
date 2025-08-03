import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Pregunta } from '../interfaces/Preguntas.interface';
import { deleteDoc, updateDoc, doc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private coleccionRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) { 
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

}
