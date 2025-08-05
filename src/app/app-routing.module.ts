import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   {
    path: 'inicioSesion',
    loadChildren:()=> import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'createQuestions',
    loadChildren:()=> import('./questions/questions.module').then(m => m.QuestionsModule),
    canActivate: [AuthGuard]
  },
   { path: '', redirectTo: '/inicioSesion/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
