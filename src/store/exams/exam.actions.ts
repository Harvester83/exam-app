// exam.actions.ts
import { createAction, props } from '@ngrx/store';
import { Exam } from './exam.model';

export const addExam = createAction('[Exam] Add Exam', props<{ exam: Exam }>());
export const removeExam = createAction(
  '[Exam] Remove Exam',
  props<{ id: string }>()
);
export const updateExam = createAction(
  '[Exam] Update Exam',
  props<{ exam: Exam }>()
);
