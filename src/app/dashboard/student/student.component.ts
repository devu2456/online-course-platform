import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../core/course.service';
import { EnrollmentService } from '../../core/enrollment.service';
import { CommonModule } from '@angular/common';
import { forkJoin,catchError,of } from 'rxjs';
import { FeedbackService } from '../../feedback.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/storageService';

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  availableCourses: any[] = []; // For all available courses
  enrolledCourses: any[] = []; // For courses the user is enrolled in
  email = '';
  feedback = {
    courseId: '',
    rating: 0,
    comment: ''
  };

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private feedbackService: FeedbackService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.email = this.storageService.getItem<string>('email') || '';
    this.loadAvailableCourses();
    this.loadEnrollmentsWithCourseDetails();
  }

  // Load all available courses
  loadAvailableCourses(): void {
    this.courseService.searchCourse('', '').subscribe(
      (response) => {
        this.availableCourses = response; // Store all available courses
      },
      (error) => {
        console.error('Error fetching available courses:', error);
      }
    );
  }

  loadEnrollmentsWithCourseDetails(): void {
    this.enrollmentService.getEnrollmentsByEmail(this.email).subscribe(
      (enrollmentResponse) => {
        const courseIds = enrollmentResponse.map((enrollment: any) => enrollment.courseId);
  
        // Fetch course details for each course ID
        const courseRequests = courseIds.map((id: string) =>
          this.courseService.getCourseByID(id).pipe(
            catchError((error) => {
              console.error(`Error fetching course with ID ${id}:`, error);
              return of(null); // Return null for failed requests
            })
          )
        );
  
        forkJoin<any[]>(courseRequests).subscribe(
          (courseDetails) => {
            // Filter out null values (failed requests)
            this.enrolledCourses = courseDetails.filter((course) => course !== null);
          },
          (error) => {
            console.error('Error fetching enrolled course details:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  enrollInCourse(courseId: string): void {
    const enrollmentData = { email: this.email, courseId: courseId.toString() };
    this.enrollmentService.enrollUser(enrollmentData).subscribe(
      (response: string) => {
        alert(response); // Display the response text in the alert
        this.loadEnrollmentsWithCourseDetails(); // Refresh enrolled courses
      },
      (error) => {
        alert('Enrollment failed or already enrolled!');
        console.error('Error enrolling in course:', error);
      }
    );
  }

  submitFeedback(courseId: string): void {
    const feedbackData = {
      userId: this.email, // Replace with the logged-in user's email
      courseId: courseId, // Set the courseId explicitly
      rating: this.feedback.rating,
      comment: this.feedback.comment
    };
  
    this.feedbackService.createFeedback(feedbackData).subscribe(
      (response) => {
        alert('Feedback submitted successfully!');
        this.feedback = { courseId: '', rating: 0, comment: '' }; // Reset feedback form
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}