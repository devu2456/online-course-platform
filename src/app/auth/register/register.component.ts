import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    role: 'student'
  };

  constructor(private apiService: ApiService) { }

  onRegister(form: any): void {
    if (form.valid) {
      this.apiService.registerUser(this.registerData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
          // Redirect to login or another page if needed
        },
        (error) => {
          if (error.error.message) {
            alert(error.error.message);
          }
          else {
            console.error('Registration failed:', error.message || error);
            alert(error.message || 'Registration failed. Please try again.');
          }

        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please fill out the form correctly.');
    }
  }
}