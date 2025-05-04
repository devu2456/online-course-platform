import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/users/me';
  private registerUrl = 'http://127.0.0.1:3000/users/register';  // API endpoint

  constructor(private http: HttpClient) {}

  // Method to get user details
  getUserDetails(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map((response) => {
        if (response.success) {
          return response.data; // Return the user data if the request is successful
        } else {
          throw new Error(response.message); // Throw an error if the request fails
        }
      })
    );
  }

  // Method to update user details
  updateUserDetails(token: string, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Pass JWT token in the Authorization header
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(this.apiUrl, userData, { headers }).pipe(
      map((response) => {
        if (response.success) {
          return response.data; // Return the updated user data if the request is successful
        } else {
          throw new Error(response.message); 
        }
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.registerUrl, userData, { headers }).pipe(
      map((response) => {
        if (response.success) {
          return response.data; // Return the user data if registration is successful
        } else {
          throw new Error(response.message); // Throw an error if registration fails
        }
      }),
      catchError((error) => {
        console.error('Error during registration:', error);
        throw error;
      })
    );
  }
}
