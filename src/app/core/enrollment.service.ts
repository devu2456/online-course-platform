import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storageService'; // Import StorageService

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://127.0.0.1:8082/enrollment'; // Base URL for enrollment endpoints

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.storageService.getItem<string>('jwtToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  enrollUser(enrollmentData: any): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.baseUrl, enrollmentData, { headers, responseType: 'text' });
  }

  getEnrollmentsByEmail(email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}s/${email}`, { headers });
  }

  getEnrollmentsByCourse(courseId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/course/${courseId}`, { headers });
  }
}