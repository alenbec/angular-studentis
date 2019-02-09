import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/_services/api.service';
import { OverviewActionTypes, LoadStudents, LoadStudentsSuccess, DeleteStudent, LoadStudent, LoadStudentSuccess, ClearStudent, SaveStudent, SaveStudentSuccess, EditStudent, NewStudent, DeleteStudentSuccess, LoadStudentError } from './overview.actions';
import { Store } from '@ngrx/store';
import { State } from '..';
import { OverviewState } from './overview.reducer';
import { Student } from 'src/app/_models/overview-models';
import { Router } from '@angular/router';

@Injectable()
export class OverviewEffects {
  constructor(
    private store$: Store<State>,
    private actions$: Actions,
    private api: ApiService,
    private router: Router
  ) {
  }

  @Effect()
  loadStudents$ = this.actions$
  .pipe(
    ofType(OverviewActionTypes.LoadStudents),
    switchMap((action: LoadStudents) => this.api.getStudents(action.rows, action.page, action.filter)),
    map(students => new LoadStudentsSuccess(students)),
    catchError(error => of(console.error(error)))
  )

  @Effect()
  loadStudent$ = this.actions$
  .pipe(
    ofType(OverviewActionTypes.LoadStudent),
    switchMap((action: LoadStudent) => this.api.getStudentById(action.id)),
    map((student: Student) => new LoadStudentSuccess(student)),
    catchError((error: string) => of(new LoadStudentError(error)))
  )

  @Effect()
  saveStudent$ = this.actions$
  .pipe(
    ofType(OverviewActionTypes.SaveStudent),
    switchMap((action: SaveStudent) => action.student.id ?
      this.api.updateStudent(action.student) :
      this.api.createStudent(action.student)),
    map((student: Student) => new SaveStudentSuccess(student))
  )

  @Effect({ dispatch: false })
  editStudent$ = this.actions$
  .pipe(
    ofType(OverviewActionTypes.EditStudent),
    switchMap((action: EditStudent) => of(action.student)),
    tap((student: Student) => this.router.navigate([`/overview/${student.id}/edit`]))
  )

  @Effect({ dispatch: false })
  newStudent$ = this.actions$
  .pipe(
    ofType(OverviewActionTypes.NewStudent),
    tap(() => this.router.navigate([`/overview/new`]))
  )

  @Effect()
  deleteStudent$ = this.actions$
  .pipe(
    ofType(OverviewActionTypes.DeleteStudent),
    switchMap((action: DeleteStudent) => this.api.deleteStudent(action.id)),
    withLatestFrom(this.store$.select('overview'), (student: Student, state: OverviewState) => {
      return state.student && student && student.id === state.student.id
    }),
    map((clear) => {
      if (clear) {
        this.router.navigate(['/overview'])
        return new ClearStudent()
      }
      return of({})
    }),
    map(() => new DeleteStudentSuccess())
  )
}
