import { OverviewActionTypes, OverviewAction } from './overview.actions'
import produce from "immer"
import { StudentsResult, Student } from 'src/app/_models/overview-models';

export interface OverviewState {
  loading: boolean
  data: StudentsResult
  student: Student
}

export const initialState: OverviewState = {
  loading: false,
  data: <StudentsResult>{
    students: []
  },
  student: <Student>{
    subjects: []
  }
}

export function reducer(state: OverviewState = initialState, action: OverviewAction): OverviewState {
  return produce(state, draftState => {
    switch (action.type) {

      case OverviewActionTypes.SetLoadingState:
        draftState.loading = action.isLoading
        return

      case OverviewActionTypes.LoadStudents:
        draftState.loading = true
        return

      case OverviewActionTypes.LoadStudent:
        draftState.loading = true
        return

      case OverviewActionTypes.LoadStudentError:
        draftState.loading = false
        draftState.student = <Student>{
          subjects: []
        }
        return

      case OverviewActionTypes.SaveStudent:
        draftState.loading = true
        return

      case OverviewActionTypes.SaveStudentSuccess:
        draftState.loading = false
        draftState.student = action.student
        return

      case OverviewActionTypes.EditStudent:
        draftState.student = action.student
        return

      case OverviewActionTypes.NewStudent:
        draftState.student = <Student>{
          subjects: []
        }
        return

      case OverviewActionTypes.ClearStudent:
        draftState.student = <Student>{
          subjects: []
        }
        return

      case OverviewActionTypes.LoadStudentSuccess:
        draftState.loading = false
        draftState.student = action.student
        return

      case OverviewActionTypes.LoadStudentsSuccess:
        draftState.loading = false
        draftState.data = action.payload
        return

      case OverviewActionTypes.DeleteStudent:
        draftState.loading = true
        return

      case OverviewActionTypes.DeleteStudentSuccess: {
        draftState.loading = false
        return
      }

      default:
        return
    }
  })
}
