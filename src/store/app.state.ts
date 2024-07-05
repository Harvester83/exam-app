import { Subject } from './subjects/subject.model';
import { Student } from './students/student.model';
import { Exam } from "./exams/exam.model";

export interface AppState {
  subjects: Subject[];
  students: Student[];
  exams: Exam[];
}