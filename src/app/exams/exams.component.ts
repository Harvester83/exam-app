// exams.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import {
  addExam,
  removeExam,
  updateExam,
} from '../../store/exams/exam.actions';
import { Exam } from '../../store/exams/exam.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subject } from '../../store/subjects/subject.model';
import { Student } from '../../store/students/student.model';
import { provideNativeDateAdapter } from "@angular/material/core";
import { uid } from "uid";
import { TableWrapComponent } from "../components/table-warp/table-wrap.component";

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;  // MM/DD/YYYY

  if (!value.match(datePattern)) {
    return { invalidDate: true };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { invalidDate: true };
  }

  return null;
}

@Component({
  selector: 'app-exams',
  standalone: true,
  templateUrl: './exams.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    TableWrapComponent,
    ReactiveFormsModule,
  ],
})
export class ExamsComponent implements OnInit {
  dataSource = new MatTableDataSource<Exam>();
  form!: FormGroup;

  exams$!: Observable<Exam[]>;
  subjects$!: Observable<Subject[]>;
  students$!: Observable<Student[]>;

  displayedColumns: string[] = [
    'subjectCode',
    'subjectName',
    'studentNum',
    'studentName',
    'examDate',
    'grade',
  ];

  isEditMode = false;
  selectedExam: Exam | null = null;

  private store: Store<AppState> = inject(Store);
  constructor(private fb: FormBuilder) {
    this.subjects$ = this.store.select('subjects');
    this.students$ = this.store.select('students');

    this.exams$ = this.store.select('exams');
    this.exams$.subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      subjectCode: ['', Validators.required],
      subjectName: ['', Validators.required],
      studentNum: ['', Validators.required],
      studentName: ['', Validators.required],
      examDate: ['', Validators.required],
      grade: [''],
    });

    this.onChange();
  }

  onChange(): void {
    this.form.get('subjectCode')?.valueChanges.pipe(distinctUntilChanged()).subscribe(subjectCode => {
      this.subjects$
        .pipe(map(subjects => subjects.find(subject => subject.subjectCode === subjectCode)))
        .subscribe(selectedSubject => {
          if (selectedSubject) {
            this.form.get('subjectName')?.setValue(selectedSubject.subjectName, { emitEvent: false });
          } else {
            this.form.get('subjectName')?.setValue('', { emitEvent: false });
          }
        });
    });

    this.form.get('subjectName')?.valueChanges.pipe(distinctUntilChanged()).subscribe(subjectName => {
      this.subjects$
        .pipe(map(subjects => subjects.find(subject => subject.subjectName === subjectName)))
        .subscribe(selectedSubject => {
          if (selectedSubject) {
            this.form.get('subjectCode')?.setValue(selectedSubject.subjectCode, { emitEvent: false });
          } else {
            this.form.get('subjectCode')?.setValue('', { emitEvent: false });
          }
        });
    });

    this.form.get('studentNum')?.valueChanges.pipe(distinctUntilChanged()).subscribe(studentNum => {
      this.students$
        .pipe(map(students => students.find(student => student.studentNum === studentNum)))
        .subscribe(selectedStudent => {
          if (selectedStudent) {
            this.form.get('studentName')?.setValue(selectedStudent.studentName, { emitEvent: false });
          } else {
            this.form.get('studentName')?.setValue('', { emitEvent: false });
          }
        });
    });

    this.form.get('studentName')?.valueChanges.pipe(distinctUntilChanged()).subscribe(studentName => {
      this.students$
        .pipe(map(students => students.find(student => student.studentName === studentName)))
        .subscribe(selectedStudent => {
          if (selectedStudent) {
            this.form.get('studentNum')?.setValue(selectedStudent.studentNum, { emitEvent: false });
          } else {
            this.form.get('studentNum')?.setValue('', { emitEvent: false });
          }
        });
    });
  }
  
  onSubmit(): void {
    const formData: Exam = this.form.value;
    if (this.isEditMode && this.selectedExam) {
      this.store.dispatch(updateExam({ exam: formData }));
      this.isEditMode = false;
      this.selectedExam = null;
    } else {
      this.store.dispatch(addExam({ exam: formData }));
    }
    this.form.reset();
  }

  removeExam(id: string): void {
    this.store.dispatch(removeExam({ id }));
  }

  updateExam(exam: Exam): void {
    console.log(exam);
    this.selectedExam = exam;
    this.form.setValue({
      id: exam.id,
      subjectCode: exam.subjectCode,
      subjectName: exam.subjectName,
      studentNum: exam.studentNum,
      studentName: exam.studentName,
      examDate: exam.examDate,
      grade: exam.grade,
    });

    this.isEditMode = true;
  }
}
