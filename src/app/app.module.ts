import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/core/header/header.component';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/core/loading-spinner/loading-spinner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import {PostService} from './services/post.service';
import {AlertService} from './services/alert.service';
import { AlertComponent } from './components/core/alert/alert.component';
import { EditPostComponent } from './components/core/edit-post/edit-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostComponent } from './components/core/delete-post/delete-post.component';
import { EditProfileComponent } from './components/core/edit-profile/edit-profile.component';
import { DeleteAccountComponent } from './components/core/delete-account/delete-account.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    ProfileComponent,
    PageNotFoundComponent,
    HomeComponent,
    PostComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    EditPostComponent,
    DeletePostComponent,
    EditProfileComponent,
    DeleteAccountComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    UserService,
    PostService,
    AlertService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditPostComponent]
})
export class AppModule { }
