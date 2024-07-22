import { createAction, props } from '@ngrx/store';
import { Subject } from './subject.model';

export const loadSubjects = createAction('[Subject] Load Subjects');

export const loadSubjectsSuccess = createAction(
  '[Subject] Load Subjects Success',
  props<{ subjects: Subject[] }>()
);

export const loadSubjectsFailure = createAction(
  '[Subject] Load Subjects Failure',
  props<{ error: any }>()
);

export const addSubject = createAction(
  '[Subject] Add Subject',
  props<{ subject: Subject }>()
);

export const removeSubject = createAction(
  '[Subject] Remove Subject',
  props<{ id: string }>()
);

export const updateSubject = createAction(
  '[Subject] Update Subject',
  props<{ subject: Subject }>()
);
