import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EvaluationComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    PrimengModule,
    ReactiveFormsModule,
    
  ]
})
export class QuestionsModule { }
