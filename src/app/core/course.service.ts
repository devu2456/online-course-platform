import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://127.0.0.1:8080/courses'; // Base URL for course endpoints

  constructor(private http: HttpClient) {}

  getCourseByID(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}`);
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.baseUrl, courseData);
  }

  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${courseId}`, courseData);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}`);
  }

  searchCourse(title: string, category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: { title, category }
    });
  }
}