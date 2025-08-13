import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Pregunta } from 'src/app/interfaces/Preguntas.interface';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent {
   @ViewChild('dt') dt: any;  // Accedemos al p-table con ViewChild

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  showForm: boolean = false;

  editInfoQuestion: boolean = false;

  disableButtons: boolean = true;

  preguntasForm: FormGroup;

  es: any;

  questions: Pregunta[] = [];

  selectedEvent: any = null;

  infoEventSelected: any;

  infoEventSelectedEdit: any;

  savingQuestion = false;

  
   constructor(private fb: FormBuilder, 
      private firestore: Firestore,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private fireStoreService: FirestoreService
    ){
    this.preguntasForm = this.fb.group({
      enunciado: ['', Validators.required],
      opciones: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      respuestaCorrecta: ['', Validators.required]
    })
  }

    get opciones() {
    return this.preguntasForm.get('opciones') as FormArray;
  }

  ngOnInit() {
    this.items = [
      { label: 'Inicio'},
      { label: 'Crear preguntas' }, 
  ];  

  this.getAllQuestions();

}

  showTable(){
  this.showForm = false;
  this.disableButtons = true;
  this.editInfoQuestion = false;
  this.cleanForm();
}

enableForm(){
  this.showForm = true;
}


cleanForm(){
  this.preguntasForm.reset();
}

saveQuestion() {
  if (this.preguntasForm.valid) {
    //EDITAR
     if (this.editInfoQuestion === true) {
     this.confirmationService.confirm({
       message: 'Está seguro que desea editar esta pregunta?',
       header: 'Confirmación',
       icon: 'pi pi-exclamation-triangle',
       acceptLabel: 'Aceptar', // Traducción para el botón de aceptación
       rejectLabel: 'Cancelar', // Traducción para el botón de rechazo
       acceptButtonStyleClass: 'my-default-button',
       rejectButtonStyleClass: 'my-secondary-button',
       accept: () => {
          if (this.infoEventSelected) {
         this.fireStoreService.updateQuestion(this.infoEventSelected, this.preguntasForm.value)
      .then(() => {
       this.messageService.add({
      severity: 'success',
      summary: 'Pregunta editada correctamente',
    });
      this.showTable();
      this.getAllQuestions();
      })
      .catch((err) => {
        this.messageService.add({
      severity: 'error',
      summary: 'Hubo un error al actualizar la pregunta' + err,
    });
      });
      }
         
       },
       reject: () => {}
   });
   } else {

    //GUARDA
    this.savingQuestion = true;
    const preguntasRef = collection(this.firestore, 'preguntas');
    addDoc(preguntasRef, this.preguntasForm.value)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pregunta creada correctamente',
        });
          this.showTable();
      this.getAllQuestions();

        this.preguntasForm.reset();

        // Reinicia con 4 opciones vacías
        while (this.opciones.length > 0) this.opciones.removeAt(0);
        for (let i = 0; i < 4; i++) {
          this.opciones.push(this.fb.control('', Validators.required));
        }

        this.savingQuestion = false; 
      })
      .catch(() => {
        this.savingQuestion = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error al guardar la pregunta',
        });
      });
   }

  } else {
    this.preguntasForm.markAllAsTouched();
    this.opciones.controls.forEach(control => control.markAsTouched());

    this.messageService.add({
      severity: 'error',
      summary: 'Complete los campos del formulario',
    });
  }
}

onFilter(event: Event, field: string) {
  const input = event.target as HTMLInputElement;  // Realizamos el cast aquí
  const value = input.value;
  this.dt.filter(value, field, 'contains');
}

selectItem(event:any){
  this.infoEventSelectedEdit = event.data;
  this.infoEventSelected = event.data.id; 
  if (event) {
     this.disableButtons = false;
  }
 
 }

 deleteEvent(){
  this.confirmationService.confirm({
    message: 'Está seguro que desea eliminar esta pregunta?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Aceptar', // Traducción para el botón de aceptación
    rejectLabel: 'Cancelar', // Traducción para el botón de rechazo
    acceptButtonStyleClass: 'my-default-button',
    rejectButtonStyleClass: 'my-secondary-button',
    accept: () => {
      if (this.infoEventSelected) {
         this.fireStoreService.deleteQuestion(this.infoEventSelected)
      .then(() => {
       this.messageService.add({
      severity: 'success',
      summary: 'Pregunta eliminada correctamente',
    });
       this.showTable();
      this.getAllQuestions();
      })
      .catch((err) => {
        this.messageService.add({
      severity: 'error',
      summary: 'Hubo un error al eliminar la pregunta' + err,
    });
      });
      }
    },
    reject: () => {}
});
 }

 editQuestion(){
  this.showForm = true;
   this.editInfoQuestion = true;
   this.preguntasForm.setValue({
    enunciado: this.infoEventSelectedEdit.enunciado,
    opciones: this.infoEventSelectedEdit.opciones,
    respuestaCorrecta: this.infoEventSelectedEdit.respuestaCorrecta,
  })
 }


 getAllQuestions(){
  this.fireStoreService.getQuestions().subscribe(data => {
    this.questions = data
    });
 }


}
