import { Action } from '@ngrx/store'

export enum AppActionTypes {
  SetTitle = '[APP] SetTitle'
}

export class SetTitle implements Action {
  readonly type = AppActionTypes.SetTitle

  constructor(public payload: string) {}
}

export type AppAction = SetTitle