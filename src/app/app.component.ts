import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects/subjects.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exam-app';
}
