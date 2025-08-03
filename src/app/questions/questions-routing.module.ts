import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';

const routes: Routes = [
   {
          path: '',
          children: [
            {
              path: '',
              component: EvaluationComponent
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
