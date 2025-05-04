import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../core/storageService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule,RouterModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; 
  showProfileMenu = false; 

  constructor(private authService: AuthService, private router: Router,private storageService:StorageService) {}

  ngOnInit(): void {
    // Subscribe to the isLoggedIn observable from AuthService
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu; // Toggle the menu visibility
  }

  onLogout(): void {
    this.showProfileMenu = false; // Close the menu after logout
    this.authService.logoutUser(); // Call the logout method
  }

  goToDashboard():void{
    const role = this.storageService.getItem<string>('role'); 

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
  }
}