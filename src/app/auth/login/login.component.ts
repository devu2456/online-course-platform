import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import { StorageService } from '../../core/storageService';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService,private storageService: StorageService) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (response) => {
          if (response.success) {
            const role = response.data.role;
            const userId = response.data.userId;
            const token = response.data.token;
            const email = response.data.email;

            this.storageService.setItem('userId', userId.toString());
            this.storageService.setItem('jwtToken', token.toString());
            this.storageService.setItem('role',role.toString());
            this.storageService.setItem('email',email.toString());

            // Navigate based on the user's role
            if (role === 'instructor') {
              this.authService.loginUser();
              this.router.navigate(['/instructor-dashboard']);
            } else if (role === 'student') {
              this.authService.loginUser();
              this.router.navigate(['/student-dashboard']);
            } else {
              alert('Unknown role. Cannot navigate.');
            }
          } else {
            // Handle failure response
            alert(response.message || 'Login failed. Please try again.');
          }
        },
        error: (err) => {
          // Handle HTTP or server errors
          alert('Login failed. Please try again.');
          console.error(err);
        }
      });
    }
  }
}