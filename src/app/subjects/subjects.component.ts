import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  Input,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  addSubject,
  removeSubject,
  updateSubject,
} from '../../store/subjects/subject.actions';
import { Subject } from '../../store/subjects/subject.model';
import { uid } from 'uid';
import { TableWrapComponent } from '../components/table-warp/table-wrap.component';

@Component({
  selector: 'app-subjects',
  standalone: true,
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
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
export class SubjectsComponent implements OnInit {
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();
  subjects$!: Observable<Subject[]>;
  displayedColumns: string[] = [
    'subjectCode',
    'subjectName',
    'classNum',
    'teacherName',
    'teacherSurname',
  ];

  isEditMode = false;
  form!: FormGroup;
  selectedSubject: Subject | null = null;

  private store: Store<AppState> = inject(Store);
  private formBuilder: FormBuilder = inject(FormBuilder);
  constructor() {
    this.subjects$ = this.store.select('subjects');
    this.subjects$.subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      subjectCode: [
        '',
        [Validators.required, Validators.pattern('^[A-Z]{3}$')],
      ],
      subjectName: ['', Validators.required],
      classNum: ['', Validators.required],
      teacherName: ['', Validators.required],
      teacherSurname: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formData: Subject = this.form.value;

    if (this.isEditMode && this.selectedSubject) {
      console.log(1, formData);
      this.store.dispatch(updateSubject({ subject: formData }));
      this.isEditMode = false;
      this.selectedSubject = null;
    } else {
      console.log(formData);
      this.store.dispatch(addSubject({ subject: { ...formData, id: uid() } }));
    }
    this.form.reset();
  }

  removeSubject(subjectId: string) {
    this.store.dispatch(removeSubject({ id: subjectId }));
  }

  updateSubject(subject: Subject): void {
    this.selectedSubject = subject;
    this.form.setValue({
      id: subject.id,
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      classNum: subject.classNum,
      teacherName: subject.teacherName,
      teacherSurname: subject.teacherSurname,
    });

    this.isEditMode = true;
  }
}
