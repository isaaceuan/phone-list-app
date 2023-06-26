import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PhoneListComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
