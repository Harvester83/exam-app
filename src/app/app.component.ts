import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects/subjects.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { StoreModule } from '@ngrx/store';
//import { elementReducer } from '../store/reducers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SubjectsComponent,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    FlexLayoutModule,
    MatToolbarModule,
    //StoreModule.forRoot({ appState: elementReducer })
  ],
  template: `
    <header>
      <mat-toolbar color="primary">
        <span>EXAM APP</span>
        <span class="example-spacer"></span>

        <nav class="nav">
          <a [routerLink]="['/']"> SUBJECTS </a>
          <a [routerLink]="['/students']"> STUDENTS </a>
          <a [routerLink]="['/exams']"> EXAMS </a>
        </nav>
      </mat-toolbar>
    </header>

    <main>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>

    <footer>
      <!-- Информация о копирайте, ссылки на политику конфиденциальности и т.д. -->
    </footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exam-app';
}
