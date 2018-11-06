import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CKEditorModule } from 'ngx-ckeditor';
import { ScrollingModule } from '@angular/cdk/scrolling';
// routing
import { routing, appRoutingProviders } from './app.routing';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserWeekComponent } from './components/user-week/user-week.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { UpdateWeekComponent } from './components/update-week/update-week.component';
import { BuildShiftsComponent } from './components/build-shifts/build-shifts.component';
import { ShowShiftsComponent } from './components/show-shifts/show-shifts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserWeekComponent,
    ContactsComponent,
    EditUserComponent,
    HomeComponent,
    HomeAdminComponent,
    AboutMeComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    UpdateWeekComponent,
    BuildShiftsComponent,
    ShowShiftsComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    CKEditorModule,
    ScrollingModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
