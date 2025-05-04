# OnlineCoursePlatform

The **OnlineCoursePlatform** is a web-based application designed to facilitate online learning. It allows instructors to create and manage courses, while students can enroll in courses, provide feedback, and track their progress.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

---

## Features

- **Instructor Dashboard**:
  - Create, update, and delete courses.
  - View feedback from students for each course.

- **Student Dashboard**:
  - Browse available courses and enroll.
  - View enrolled courses and submit feedback.

- **Authentication**:
  - Role-based access for instructors and students.

- **Responsive Design**:
  - Optimized for both desktop and mobile devices.

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

---

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

---

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

---

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

---

## API Endpoints

The application interacts with the following backend APIs:

- **Course Management**:
  - `GET /courses`: Fetch all available courses.
  - `POST /courses`: Create a new course.
  - `DELETE /courses/{id}`: Delete a course by ID.

- **Enrollment**:
  - `POST /enrollment`: Enroll a user in a course.
  - `GET /enrollment/{email}`: Fetch enrolled courses for a user.

- **Feedback**:
  - `POST /feedback`: Submit feedback for a course.
  - `GET /feedback/course/{courseId}`: Fetch feedback for a specific course.

---

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For backend API documentation, refer to the backend repository or API documentation provided by the development team.