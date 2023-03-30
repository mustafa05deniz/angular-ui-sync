import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { App } from './app';
import { Header } from './components/header/header.component';
import { AppRoutingModule } from './app.routing';
import { Footer } from './components/footer/footer.component';
import { Login } from './pages/login/login.component';
import { Home } from './pages/home/home.component';

@NgModule({
  declarations: [App, Home, Header, Footer, Login],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [MaterialExampleModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule { }
