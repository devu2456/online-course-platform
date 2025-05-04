import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { InstructorComponent } from './dashboard/instructor/instructor.component';
import { StudentComponent } from './dashboard/student/student.component';
import { AuthGuardService } from './auth/auth.guard.service';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'instructor-dashboard', component: InstructorComponent,canActivate: [AuthGuardService] },
  { path: 'student-dashboard', component: StudentComponent,canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];