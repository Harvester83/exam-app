import { createReducer, on, Action } from '@ngrx/store';
import { addStudent, removeStudent, updateStudent } from './student.actions';
import { Student } from './student.model';
import { uid } from 'uid';

export const initialStudentState: Student[] = [
  {
    id: uid(),
    studentNum: 41,
    studentName: 'Jane',
    studentSurname: 'Lier',
    studentClass: 10,
  },
  {
    id: uid(),
    studentNum: 42,
    studentName: 'Mark',
    studentSurname: 'Wesan',
    studentClass: 10,
  },
  {
    id: uid(),
    studentNum: 43,
    studentName: 'Tor',
    studentSurname: 'Khanyi',
    studentClass: 10,
  },
  {
    id: uid(),
    studentNum: 44,
    studentName: 'Hgen',
    studentSurname: 'Pen',
    studentClass: 11,
  },
  {
    id: uid(),
    studentNum: 45,
    studentName: 'Alex',
    studentSurname: 'Bang',
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
