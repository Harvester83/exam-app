import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
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
import { uid } from 'uid';
import { AppState } from '../../store/app.state';
// import {
//   addSubject,
//   removeSubject,
//   updateSubject,
// } from '../../store/subjects/subject.actions';
import { Subject } from '../../store/subjects/subject.model';
import { TableWrapComponent } from '../components/table-warp/table-wrap.component';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  templateUrl: './subjects.component.html',
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
  isLoading = false;
  form!: FormGroup;
  selectedSubject: Subject | null = null;

  private store: Store<AppState> = inject(Store);
  private formBuilder: FormBuilder = inject(FormBuilder);
  subjectService: SubjectService = inject(SubjectService);

  constructor() {
    this.subjectService.getSubjects().subscribe((data) => {
      this.dataSource.data = data || [];
    });
  }

  async ngOnInit(): Promise<void> {
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

    this.isLoading = true;
    try {
      await this.subjectService.loadSubjects();
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      this.isLoading = false;
    }
  }
  

  onSubmit(): void {
    const formData: Subject = this.form.value;

    if (this.isEditMode && this.selectedSubject) {
      const updatedSubjects = this.dataSource.data.map(subject =>
        subject.id === this.selectedSubject!.id ? { ...formData, id: this.selectedSubject!.id } : subject
      );
      this.subjectService.updateSubjects(updatedSubjects);
      this.isEditMode = false;
      this.selectedSubject = null;
    } else {
      const newSubject: Subject = { ...formData, id: uid() };
      this.subjectService.updateSubjects([...this.dataSource.data, newSubject]);
    }
    
    this.form.reset();
  }

  removeSubject(subjectId: string) {
    this.subjectService.removeSubject(subjectId);
  }

  editSubject(subject: Subject): void {
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
