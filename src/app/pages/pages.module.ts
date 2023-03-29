import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from 'src/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', component: UserComponent }

];

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: [],
})
export class PagesModule { }
