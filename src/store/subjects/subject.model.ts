export type codeType =
  `${Uppercase<string>}${Uppercase<string>}${Uppercase<string>}`;

export interface Subject {
  id: string;
  subjectCode: codeType;
  subjectName: string;
  classNum: number;
  teacherName: string;
  teacherSurname: string;
}
