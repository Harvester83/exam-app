import { createAction, props } from '@ngrx/store';
import { codeType } from './subject.model';
import { Subject } from './subject.model';

export const loadElements = createAction('[Element List] Load Elements');

export const addSubject = createAction(
  '[Subject List] Add Subject',
  props<{ subject: Subject }>()
);

export const removeSubject = createAction(
  '[Subject List] Remove Subject',
  props<{ id: string }>()
);

export const updateSubject = createAction(
  '[Subject] Update Subject',
  props<{ subject: Subject }>()
);
