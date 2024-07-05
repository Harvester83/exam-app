import { createReducer, on, Action } from '@ngrx/store';
import { addSubject, removeSubject, updateSubject } from './subject.actions';
import { Subject } from './subject.model';
import { uid } from 'uid';

const initialState: Subject[] = [
  {
    id: uid(),
    subjectCode: 'MAT',
    subjectName: 'Math',
    classNum: 1,
    teacherName: 'John',
    teacherSurname: 'Doe',
  },
  {
    id: uid(),
    subjectCode: 'PHY',
    subjectName: 'Physics',
    classNum: 2,
    teacherName: 'Jane',
    teacherSurname: 'Doe',
  },
  {
    id: uid(),
    subjectCode: 'CHE',
    subjectName: 'Chemistry',
    classNum: 3,
    teacherName: 'Mark',
    teacherSurname: 'Doe',
  },
  {
    id: uid(),
    subjectCode: 'BIO',
    subjectName: 'Biology',
    classNum: 4,
    teacherName: 'Sarah',
    teacherSurname: 'Doe',
  },
  {
    id: uid(),
    subjectCode: 'HIS',
    subjectName: 'History',
    classNum: 5,
    teacherName: 'Mike',
    teacherSurname: 'Doe',
  },
];

const _subjectReducer = createReducer(
  initialState,
  on(addSubject, (state, { subject }) => [...state, subject]),

  on(removeSubject, (state, { id }) =>
    state.filter((subject) => subject.id !== id)
  ),

  on(updateSubject, (state, { subject }) => {
    const index = state.findIndex((item) => {
      console.log('item.subjectCode: ', item.id);
      console.log('subject.subjectCode: ', subject.id);
      return item.id === subject.id

    });

    if (index >= 0) {
      const updatedState = state.map((item, idx) =>
        idx === index ? { ...item, ...subject } : item
      );

      console.log({updatedState});
      return updatedState;
    }

    console.log(-1, {state});
    return state;
  })
);

export function subjectReducer(state: Subject[] | undefined, action: Action) {
  return _subjectReducer(state, action);
}
