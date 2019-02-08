import { AppAction, AppActionTypes } from './app.actions'
import produce from "immer"

export interface AppState {
  title: string
}

export const initialState: AppState = {
  title: 'Student Information System'
}

export function reducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionTypes.SetTitle:
      return produce(state, draftState => {
        draftState.title = action.payload
      })
    default:
      return state
  }
}