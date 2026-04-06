import { Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '',              redirectTo: 'students', pathMatch: 'full' },
  { path: 'login',        component: LoginComponent },
  { path: 'students',     component: StudentListComponent,  canActivate: [authGuard] },
  { path: 'students/add', component: StudentFormComponent,  canActivate: [authGuard] },
  { path: 'students/edit/:id', component: StudentFormComponent, canActivate: [authGuard] }  
];
