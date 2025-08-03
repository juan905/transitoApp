import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
   {
          path: '',
          children: [
            {
              path: '',
              component: EvaluationComponent
            },
             {
              path: 'examen',
              component: TestComponent
            },
            {
              path: '**', redirectTo: 'createQuestions'
            }
      
          ]
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
