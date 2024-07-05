import { createReducer, on, Action } from '@ngrx/store';
import { addStudent, removeStudent, updateStudent } from './student.actions';
import { Student } from './student.model';
import { uid } from 'uid';

export const initialStudentState: Student[] = [
  {
    id: uid(),
    studentNum: 1,
    studentName: 'John',
    studentSurname: 'Doe',
    studentClass: 10,
  },
  {
    id: uid(),
    studentNum: 2,
    studentName: 'Jane',
    studentSurname: 'Doe',
    studentClass: 10,
  },
  {
    id: uid(),
    studentNum: 3,
    studentName: 'Mark',
    studentSurname: 'Doe',
    studentClass: 10,
  },
  {
    id: uid(),
    studentNum: 4,
    studentName: 'Mary',
    studentSurname: 'Doe',
    studentClass: 11,
  },
  {
    id: uid(),
    studentNum: 5,
    studentName: 'Tom',
    studentSurname: 'Doe',
    studentClass: 11,
  },
];

const _studentReducer = createReducer(
  initialStudentState,
  on(addStudent, (state, { student }) => [...state, student]),
  on(removeStudent, (state, { id }) =>
    state.filter((student) => student.id !== id)
  ),
  on(updateStudent, (state, { student }) => {
    const index = state.findIndex((s) => s.id === student.id);
    const updatedState = [...state];
    if (index >= 0) {
      updatedState[index] = student;
      
      return updatedState
    }

    return updatedState;
  })
);

export function studentReducer(state: Student[] | undefined, action: Action) {
  return _studentReducer(state, action);
}
