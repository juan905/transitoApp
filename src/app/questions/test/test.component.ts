import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Pregunta } from 'src/app/interfaces/Preguntas.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  questions: Pregunta[] = [];
  quizForm: FormGroup;
  preguntasSeleccionadas: any[] = [];
  mostrarResultados = false;
  questionsTotal: number = 0
  visible: boolean = false;
  alertQuestions = false;
  validQuestions: any[] = [];

  constructor(private fb: FormBuilder, private fireStoreService: FirestoreService,  private messageService: MessageService){
    this.quizForm = this.fb.group({
      preguntas: this.fb.array([]),
    });
  }

    ngOnInit() {
    this.items = [
      { label: 'Inicio'},
      { label: 'Responder preguntas' }, 
  ];  

  this.getAllQuestions();

}


  get preguntasFormArray(): FormArray {
    return this.quizForm.get('preguntas') as FormArray;
  }


 getAllQuestions(){
  this.fireStoreService.getQuestions().subscribe(data => {
    this.questions = data
    });
 }


generateQuestions() {
  this.fireStoreService.getQuestions().subscribe((data) => {
    const maximunQuantity = 40;
    this.questionsTotal = data.length;
    const questionsLimit = Math.min(this.questionsTotal, maximunQuantity);

    if (this.questionsTotal <=0) {
      return this.showDialog();
    } 

    this.preguntasSeleccionadas = this.shuffleArray(data).slice(0, questionsLimit);
    this.preguntasFormArray.clear();

    this.preguntasSeleccionadas.forEach((pregunta) => {
      this.preguntasFormArray.push(
        this.fb.group({
          respuestaSeleccionada: [null, Validators.required],
        })
      );
    });

    this.mostrarResultados = false;
  });
}


   shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

   enviarRespuestas() {
    if (this.quizForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Debes responder todas las preguntas',
      });
      this.preguntasFormArray.markAllAsTouched();
      return;
    }

    this.mostrarResultados = true;

     this.validQuestions = this.preguntasSeleccionadas.filter((pregunta, index) =>
      pregunta.respuestaCorrecta === this.preguntasFormArray.at(index).value.respuestaSeleccionada
    );
    this.showAlertQuestions();
  }

  getRespuestaSeleccionadaControl(i: number) {
  return this.preguntasFormArray.at(i).get('respuestaSeleccionada') as FormControl;
}

 showDialog() {
        this.visible = true;
    }

  showAlertQuestions(){
    this.alertQuestions = true;
  }


}
