import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentService } from './services/document.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { DocumentComponent } from './document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [DocumentService, DocumentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
