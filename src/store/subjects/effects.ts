import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SubjectService } from '../../app/subject.service';
import { loadSubjects, loadSubjectsFailure, loadSubjectsSuccess } from "./subject.actions";

@Injectable()
export class SubjectEffects {

  // loadSubjects$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadSubjects),
  //     mergeMap(() =>
  //       this.subjectService.loadSubjects().pipe(
  //         map((subjects) => loadSubjectsSuccess({ subjects })),
  //         catchError((error) => of(loadSubjectsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}
}
