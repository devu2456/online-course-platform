import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storageService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/users/login'; // Point to Node.js service
  private token: string | null = null;
  private role: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient,private router: Router,private storageService : StorageService) {}

  loginUser() {
    // Perform login logic
    this.loggedIn.next(true);
  }

  logoutUser() {
    // Perform logout logic
    this.loggedIn.next(false);
    this.logout();
  }

  logout(): void {
    this.storageService.clear(); // Clear all stored data
    this.router.navigate(['/login']); // Redirect to login page
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap((response: any) => {
        this.token = response.token;
        this.role = response.role;
        this.storageService.setItem('token', this.token ?? '');
        this.storageService.setItem('role', this.role ?? '');
      })
    );
  }

  getUserRole(): string | null {
    return this.role || this.storageService.getItem('role');
  }

  getToken(): string | null {
    return this.token || this.storageService.getItem('token');
  }
}