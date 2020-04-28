import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { DatePipe } from '@angular/common';
import { FbaseDatePipe } from './components/pipes/fbase-date.pipe';
import { TruncateTextPipe } from './components/pipes/truncate-text.pipe';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NoteDetailComponent,
    NoteListComponent,
    FbaseDatePipe,
    TruncateTextPipe,
    LoginDialogComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
