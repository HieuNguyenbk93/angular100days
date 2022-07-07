import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';

const routes: Routes = [
  { path: "sign-in-rf", component: SignInRfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
