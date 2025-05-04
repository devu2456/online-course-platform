import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { StorageService } from '../core/storageService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    id: '',
    name: '',
    password: '',
    email: '',
    role: ''
  };
  token = ''; // JWT token
  changePassword:boolean = false;
  

  constructor(private apiService: ApiService, private storageService: StorageService) {}

  ngOnInit(): void {
    // Get the JWT token from AuthService
    this.token = this.storageService.getItem<string>('jwtToken') || '';

    // Fetch user details from the API
    this.apiService.getUserDetails(this.token).subscribe(
      (response) => {
        this.user = response; // Populate user details
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  onUpdateProfile(): void {
    // Update user details via the API
    this.apiService.updateUserDetails(this.token, this.user).subscribe(
      (response) => {
        alert('Profile updated successfully!');
        this.user = response; // Update the user object with the response
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      }
    );
  }
}