import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ModalModule } from 'angular-custom-modal';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSpinnerModule } from 'ngx-spinner';
import { DocamoInterceptor } from './docamo.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FeedComponent,
    HeaderComponent,
    EditProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AvatarModule,
    MdbModalModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    Ng2TelInputModule,
    BrowserAnimationsModule,
    ModalModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot(),
    InfiniteScrollModule,
    NgxSpinnerModule,
     

    

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1029695319621-fjbe1t812mm8le9ehmc8g024sp9l160m.apps.googleusercontent.com') // your client id
          }
        ]
      }
    },
  
    {
      provide:HTTP_INTERCEPTORS,
      useClass:DocamoInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
