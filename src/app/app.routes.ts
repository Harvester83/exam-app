import { Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';

export const routes: Routes = [
  {
    path: '',
    component: SubjectsComponent,
    title: 'Subjects',
  },
  {
    path: 'students',
    component: StudentsComponent,
    title: 'Students',
  },
  {
    path: 'exams',
    component: ExamsComponent,
    title: 'Exams',
  },
];

export default routes;
