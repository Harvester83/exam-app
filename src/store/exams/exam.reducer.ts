import { createReducer, on } from '@ngrx/store';
import { addExam, removeExam, updateExam } from './exam.actions';
import { Exam } from './exam.model';
import { uid } from 'uid';

export const initialState: Exam[] = [
  {
    id: uid(),
    studentNum: 12345,
    studentName: 'John',
    subjectCode: 'MAT',
    subjectName: 'Mathematics',
    examDate: new Date(),
    grade: 5,
  },
  {
    id: uid(),
    studentNum: 12346,
    studentName: 'Jane',
    subjectCode: 'PHY',
    subjectName: 'Physics',
    examDate: new Date(),
    grade: 4,
  },
  {
    id: uid(),
    studentNum: 12347,
    studentName: 'Mark',
    subjectCode: 'CHE',
    subjectName: 'Chemistry',
    examDate: new Date(),
    grade: 4,
  },
];

export const examReducer = createReducer(
  initialState,
  on(addExam, (state, { exam }) => [...state, exam]),

  on(removeExam, (state, { id }) => state.filter((exam) => exam.id !== id)),

  on(updateExam, (state, { exam }) => {
    const index = state.findIndex((e) => e.id === exam.id);
    if (index >= 0) {
      const updatedState = [...state];
      updatedState[index] = exam;
      return updatedState;
    }
    return state;
  })
);
