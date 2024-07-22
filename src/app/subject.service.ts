import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from '../store/subjects/subject.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { uid } from 'uid';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjects = new BehaviorSubject<Subject[]>([]);

  getSubjects(): Observable<Subject[]> {
    return this.subjects.asObservable();
  }

  async loadSubjects(): Promise<void> {
    try {
      // Mock data from server
      const fakeData: Subject[] = [
        {
          id: uid(),
          subjectCode: 'MAT',
          subjectName: 'Mathematics',
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
      ];

      setTimeout(() => {
        this.subjects.next(fakeData);
      }, 1000);
    } catch (error) {
      console.error('Error loading subjects:', error);
      this.subjects.next([]);
    }
  }


  removeSubject(id: string): void {

    console.log('this.subjects.getValue(): ', this.subjects.getValue())
    const currentSubjects = this.subjects.getValue();
    const updatedSubjects = currentSubjects.filter(subject => subject.id !== id);

    this.subjects.next(updatedSubjects);
  }

  updateSubjects(subjects: Subject[]): void {
    this.subjects.next(subjects);
  }
}
