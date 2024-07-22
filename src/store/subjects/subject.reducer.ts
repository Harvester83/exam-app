import { createReducer, on, Action } from '@ngrx/store';
import {
  loadSubjects,
  loadSubjectsSuccess,
  loadSubjectsFailure,
  addSubject,
  removeSubject,
  updateSubject,
} from './subject.actions';
import { Subject } from './subject.model';

export interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: any;
}

export const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

export const subjectReducer = createReducer(
  initialState,
  on(loadSubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadSubjectsSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
    loading: false,
  })),
  on(loadSubjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addSubject, (state, { subject }) => ({
    ...state,
    subjects: [...state.subjects, subject],
  })),

  on(updateSubject, (state, { subject }) => ({
    ...state,
    subjects: state.subjects.map((s) => (s.id === subject.id ? subject : s)),
  })),

  on(removeSubject, (state, { id }) => ({
    ...state,
    subjects: state.subjects.filter((subject) => subject.id !== id),
  }))

  // on(updateSubject, (state, { subject }) => {
  //   const index = state.findIndex((item) => {
  //     return item.id === subject.id;
  //   });

  //   if (index >= 0) {
  //     const updatedState = state.map((item, idx) =>
  //       idx === index ? { ...item, ...subject } : item
  //     );

  //     console.log({ updatedState });
  //     return updatedState;
  //   }

  //   console.log(-1, { state });
  //   return state;
  // })
);
