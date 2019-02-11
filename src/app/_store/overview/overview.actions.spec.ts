import * as overview  from "./overview.actions";

describe('OverviewActions', () => {
  it('should create SetLoadingState action of correct type', () => {
    const action = new overview.SetLoadingState(false)
    expect(action.type).toEqual(overview.OverviewActionTypes.SetLoadingState)
  })

  it('should create LoadStudents action of correct type', () => {
    const action = new overview.LoadStudents(null, null, null)
    expect(action.type).toEqual(overview.OverviewActionTypes.LoadStudents)
  })

  it('should create LoadStudentsSuccess action of correct type', () => {
    const action = new overview.LoadStudentsSuccess(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.LoadStudentsSuccess)
  })

  it('should create LoadStudentsError action of correct type', () => {
    const action = new overview.LoadStudentsError(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.LoadStudentsError)
  })

  it('should create LoadStudent action of correct type', () => {
    const action = new overview.LoadStudent(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.LoadStudent)
  })

  it('should create LoadStudentSuccess action of correct type', () => {
    const action = new overview.LoadStudentSuccess(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.LoadStudentSuccess)
  })

  it('should create LoadStudentError action of correct type', () => {
    const action = new overview.LoadStudentError(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.LoadStudentError)
  })

  it('should create SaveStudent action of correct type', () => {
    const action = new overview.SaveStudent(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.SaveStudent)
  })

  it('should create SaveStudentSuccess action of correct type', () => {
    const action = new overview.SaveStudentSuccess(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.SaveStudentSuccess)
  })

  it('should create SaveStudentError action of correct type', () => {
    const action = new overview.SaveStudentError(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.SaveStudentError)
  })

  it('should create ClearStudent action of correct type', () => {
    const action = new overview.ClearStudent()
    expect(action.type).toEqual(overview.OverviewActionTypes.ClearStudent)
  })

  it('should create EditStudent action of correct type', () => {
    const action = new overview.EditStudent(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.EditStudent)
  })

  it('should create NewStudent action of correct type', () => {
    const action = new overview.NewStudent()
    expect(action.type).toEqual(overview.OverviewActionTypes.NewStudent)
  })

  it('should create DeleteStudent action of correct type', () => {
    const action = new overview.DeleteStudent(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.DeleteStudent)
  })

  it('should create DeleteStudentSuccess action of correct type', () => {
    const action = new overview.DeleteStudentSuccess()
    expect(action.type).toEqual(overview.OverviewActionTypes.DeleteStudentSuccess)
  })

  it('should create DeleteStudentError action of correct type', () => {
    const action = new overview.DeleteStudentError(null)
    expect(action.type).toEqual(overview.OverviewActionTypes.DeleteStudentError)
  })

})
