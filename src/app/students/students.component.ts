import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Student } from '../../store/students/student.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  addStudent,
  removeStudent,
  updateStudent,
} from '../../store/students/student.actions';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { uid } from 'uid';
import { TableWrapComponent } from '../components/table-warp/table-wrap.component';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TableWrapComponent,
    ReactiveFormsModule,

  ],
})
export class StudentsComponent implements OnInit {
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  students$!: Observable<Student[]>;

  displayedColumns: string[] = [
    'studentNum',
    'studentName',
    'studentSurname',
    'studentClass',
  ];

  isEditMode = false;
  form!: FormGroup;
  selectedStudent: Student | null = null;
  private store: Store<AppState> = inject(Store);

  constructor(private fb: FormBuilder) {
    this.students$ = this.store.select('students');
    this.students$.subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      studentNum: ['', Validators.required],
      studentName: [''],
      studentSurname: [''],
      studentClass: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formData: Student = this.form.value;

    if (this.isEditMode && this.selectedStudent) {
      this.store.dispatch(updateStudent({ student: formData }));
      this.isEditMode = false;
      this.selectedStudent = null;
    } else {
      this.store.dispatch(addStudent({ student: { ...formData, id: uid() } }));
    }
    this.form.reset();
  }

  removeStudent(id: string): void {
    this.store.dispatch(removeStudent({ id }));
  }

  updateStudent(student: Student): void {
    this.selectedStudent = student;
    this.form.setValue({
      id: student.id,
      studentNum: student.studentNum,
      studentName: student.studentName,
      studentSurname: student.studentSurname,
      studentClass: student.studentClass,
    });

    this.isEditMode = true;
  }
}
