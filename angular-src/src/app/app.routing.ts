import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserWeekComponent } from './components/user-week/user-week.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home-admin', component: HomeAdminComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'edit-user', component: EditUserComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'user-week', component: UserWeekComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
