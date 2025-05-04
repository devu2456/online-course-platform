import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://127.0.0.1:8083/feedback'; 

  constructor(private http: HttpClient) {}

  createFeedback(feedbackData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl, feedbackData, { headers });
  }

  getFeedbackByCourseId(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${courseId}`);
  }
  
}