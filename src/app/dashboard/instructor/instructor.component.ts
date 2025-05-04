import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../core/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../feedback.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  courses: any[] = [];
  feedbacks: { [key: string]: any[] } = {}; 
  newCourse = {
    title: '',
    description: '',
    instructorId: 1, // Replace with the logged-in instructor's ID
    category: '',
    modules: [{ moduleName: '' }] // Initialize with one empty module
  };

  constructor(private courseService: CourseService,private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.searchCourse('', '').subscribe(
      (response) => {
        this.courses = response;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addModule(): void {
    this.newCourse.modules.push({ moduleName: '' });
  }

  removeModule(index: number): void {
    this.newCourse.modules.splice(index, 1);
  }

  createCourse(): void {
    this.courseService.createCourse(this.newCourse).subscribe(
      (response) => {
        alert('Course created successfully!');
        this.loadCourses(); // Refresh courses
        this.resetForm(); // Reset the form after creation
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );
  }

  resetForm(): void {
    this.newCourse = {
      title: '',
      description: '',
      instructorId: 1,
      category: '',
      modules: [{ moduleName: '' }]
    };
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId.toString()).subscribe(
      (response) => {
        alert('Course deleted successfully!');
        this.loadCourses(); // Refresh the course list after deletion
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  viewFeedback(courseId: string): void {
    this.feedbackService.getFeedbackByCourseId(courseId).subscribe(
      (response) => {
        this.feedbacks[courseId] = response; // Store feedbacks for the course
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }
}