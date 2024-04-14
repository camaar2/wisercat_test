import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ApiService } from './service/api.service';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    MessageComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers:[
    ApiService
  ]
})
export class AppModule { }