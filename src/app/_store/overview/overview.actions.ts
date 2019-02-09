import { Action } from '@ngrx/store'
import { StudentsResult, Student } from 'src/app/_models/overview-models';
import { ApiService } from 'src/app/_services/api.service';

export enum OverviewActionTypes {
  SetLoadingState = '[OVERVIEW] SetLoadingState',
  LoadStudent = '[OVERVIEW] LoadStudent',
  LoadStudentSuccess = '[OVERVIEW] LoadStudentSuccess',
  LoadStudentError = '[OVERVIEW] LoadStudentError',
  ClearStudent = '[OVERVIEW] ClearStudent',
  EditStudent = '[OVERVIEW] EditStudent',
  NewStudent = '[OVERVIEW] NewStudent',
  LoadStudents = '[OVERVIEW] LoadStudents',
  LoadStudentsSuccess = '[OVERVIEW] LoadDataSuccess',
  DeleteStudent = '[OVERVIEW] DeleteStudent',
  DeleteStudentSuccess = '[OVERVIEW] DeleteStudentSuccess',
  SaveStudent = '[OVERVIEW] SaveStudent',
  SaveStudentSuccess = '[OVERVIEW] SaveStudentSuccess'
}

export class SetLoadingState implements Action {
  readonly type = OverviewActionTypes.SetLoadingState

  constructor(public isLoading: boolean) { }
}

export class LoadStudent implements Action {
  readonly type = OverviewActionTypes.LoadStudent

  constructor(public id: number) { }
}

export class ClearStudent implements Action {
  readonly type = OverviewActionTypes.ClearStudent

  constructor() { }
}

export class SaveStudent implements Action {
  readonly type = OverviewActionTypes.SaveStudent

  constructor(public student: Student) { }
}

export class SaveStudentSuccess implements Action {
  readonly type = OverviewActionTypes.SaveStudentSuccess

  constructor(public student: Student) { }
}

export class EditStudent implements Action {
  readonly type = OverviewActionTypes.EditStudent

  constructor(public student: Student) { }
}

export class NewStudent implements Action {
  readonly type = OverviewActionTypes.NewStudent

  constructor() { }
}

export class LoadStudentSuccess implements Action {
  readonly type = OverviewActionTypes.LoadStudentSuccess

  constructor(public student: Student) { }
}

export class LoadStudentError implements Action {
  readonly type = OverviewActionTypes.LoadStudentError

  constructor(public error: string) { }
}

export class LoadStudents implements Action {
  readonly type = OverviewActionTypes.LoadStudents

  constructor(public page: number, public rows: number, public filter: string) { }
}

export class LoadStudentsSuccess implements Action {
  readonly type = OverviewActionTypes.LoadStudentsSuccess

  constructor(public payload: StudentsResult) { }
}

export class DeleteStudent implements Action {
  readonly type = OverviewActionTypes.DeleteStudent

  constructor(public id: number) { }
}

export class DeleteStudentSuccess implements Action {
  readonly type = OverviewActionTypes.DeleteStudentSuccess

  constructor() { }
}

export type OverviewAction =
  SetLoadingState | LoadStudent | LoadStudentSuccess | ClearStudent | LoadStudents |
  LoadStudentsSuccess | DeleteStudent | DeleteStudentSuccess | SaveStudent | SaveStudentSuccess |
  EditStudent | NewStudent | LoadStudentError
