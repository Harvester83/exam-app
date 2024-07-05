import { createAction, props } from '@ngrx/store';
import { Student } from './student.model';

export const addStudent = createAction(
  '[Student List] Add Student',
  props<{ student: Student }>()
);

export const removeStudent = createAction(
  '[Student List] Remove Student',
  props<{ id: string }>()
);

export const updateStudent = createAction(
  '[Student List] Update Student',
  props<{ student: Student }>()
);