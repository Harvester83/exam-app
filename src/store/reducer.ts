import { ActionReducerMap } from '@ngrx/store';
import { subjectReducer } from './subjects/subject.reducer';
import { studentReducer } from './students/student.reducer';
import { AppState } from "./app.state";
import { examReducer } from "./exams/exam.reducer";

export const reducers: ActionReducerMap<AppState> = {
  subjects: subjectReducer,
  students: studentReducer,
  exams: examReducer,
};