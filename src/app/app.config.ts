import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { subjectReducer } from '../store/subjects/subject.reducer';
import { studentReducer } from '../store/students/student.reducer';
import { examReducer } from '../store/exams/exam.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideStore({
      subjects: subjectReducer,
      students: studentReducer,
      exams: examReducer,
    }),
  ],
};
