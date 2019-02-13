import { TestBed } from "@angular/core/testing";
import { OverviewEffects } from './overview.effects'
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from 'src/app/_store';
import { ApiService } from 'src/app/_services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import * as OverviewActions from './overview.actions'
import { Student, StudentsResult } from 'src/app/_models/overview-models';
import { of } from 'rxjs';
import { map, tap, switchMap, withLatestFrom, catchError, exhaustMap } from 'rxjs/operators';

describe('OverviewEffects', () => {

  let effects: OverviewEffects
  let actions: Observable<any>
  let apiService: ApiService
  const sampleStudents = [
    <Student> {
      id: 66000001,
      firstName: 'Johhny',
      lastName: 'Bravo'
    },
    <Student> {
      id: 66000002,
      firstName: 'Daffy',
      lastName: 'Duck'
    },
    <Student> {
      id: 66000002,
      firstName: 'Mickey',
      lastName: 'Mouse'
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        OverviewEffects,
        provideMockActions(() => actions),
        ApiService
      ]
    })

    effects = TestBed.get(OverviewEffects)
    apiService = TestBed.get(ApiService)

    // hack to avoid delays for easier testing
    spyOn(apiService, 'delay').and.returnValue((result) => result)
  })

  it('LoadStudents should trigger error action when invalid parameters are provided', () => {
    const action = new OverviewActions.LoadStudents(null, null, null)
    const completition = new OverviewActions.LoadStudentsError(
      'Parameters studentsPerPage and page have to be a valid numbers.')
    actions = hot('-a', { a: action })
    const expected = cold('-b', { b: completition })
    expect(effects.loadStudents$).toBeObservable(expected)
  })

  it('LoadStudents should trigger success action with all students', () => {
    // because each instance of ApiService returns differend results due to
    // its nature, we can only test execution flow. In order to also test
    // return value of LoadStudentsSuccess action, we must mock getStudents
    // method so we can predict expected value
    const studentsResult = <StudentsResult> {
      page: 1,
      recordsPerPage: sampleStudents.length,
      totalFilteredRecords: sampleStudents.length,
      totalRecords: sampleStudents.length,
      students: sampleStudents
    }
    apiService.getStudents = () => of(studentsResult)
    const action = new OverviewActions.LoadStudents(null, null, null)
    const completition = new OverviewActions.LoadStudentsSuccess(studentsResult)
    actions = cold('a', { a: action })
    const expected = cold('b', { b:  completition })
    expect(effects.loadStudents$).toBeObservable(expected)
  })

  it('LoadStudent should trigger error action when invalid student id is provided ', () => {
    const action = new OverviewActions.LoadStudent(0)
    const completition = new OverviewActions.LoadStudentError('No student with such id.')
    actions = hot('a', { a: action })
    const expected = cold('b', { b: completition })
    expect(effects.loadStudent$).toBeObservable(expected)
  })

  it('LoadStudent should trigger success action with exact student that was requested', () => {
    // because each instance of ApiService returns differend results due to
    // its nature, we can only test execution flow. In order to also test
    // return value of LoadStudentSuccess action, we must mock getStudentById
    // method so we can predict expected value
    const student = sampleStudents[0]
    const action = new OverviewActions.LoadStudent(student.id)
    const completition = new OverviewActions.LoadStudentSuccess(student)
    actions = hot('a', { a: action })
    const expected = cold('b', { b: completition })
    apiService.getStudentById = () => of(student)
    expect(effects.loadStudent$).toBeObservable(expected)
  })

  it('SaveStudent should trigger error action when trying to save student with non existing id', () => {
    const student = <Student>{
      id: 9999999
    }
    const action = new OverviewActions.SaveStudent(student)
    const completition = new OverviewActions.SaveStudentError('Student with specified id does not exist.')
    actions = hot('a', { a: action })
    const expected = cold('b', { b: completition })
    expect(effects.saveStudent$).toBeObservable(expected)
  })

  it('SaveStudent should trigger success action when trying to save existing student', () => {
    // we know for that student with existing id exists so we don't have to mock save method
    const student = <Student>{
      id: 66000001,
      firstName: 'Johnny',
      lastName: 'Bravo',
      year: 5,
      subjects: []
    }
    const action = new OverviewActions.SaveStudent(student)
    const completition = new OverviewActions.SaveStudentSuccess(student)
    actions = hot('a', { a: action })
    const expected = cold('b', { b: completition })
    expect(effects.saveStudent$).toBeObservable(expected)
  })

  it('SaveStudent should trigger success action when trying to save student new student', () => {
    // we know that ApiService initialy holds 500 students starting with id 66000001
    // and that the newly created student has to have incremental id with value 66000501
    const student = <Student>{
      id: null,
      firstName: 'Johnny',
      lastName: 'Bravo',
      year: 5,
      subjects: []
    }
    const newStudent = { ...student, id: 66000501 } as Student
    const action = new OverviewActions.SaveStudent(student)
    const completition = new OverviewActions.SaveStudentSuccess(newStudent)
    actions = hot('a', { a: action })
    const expected = cold('b', { b: completition })
    expect(effects.saveStudent$).toBeObservable(expected)
  })

  it('SaveStudent should trigger success action with exact student that was saved', () => {
    // because each instance of ApiService returns differend results due to
    // its nature, we can only test execution flow. In order to also test
    // return value of LoadStudentSuccess action, we must mock updateStudent
    // method so we can predict expected value
    const student = sampleStudents[0]
    const action = new OverviewActions.SaveStudent(student)
    const completition = new OverviewActions.SaveStudentSuccess(student)
    actions = hot('a', { a: action })
    const expected = cold('b', { b: completition })
    apiService.updateStudent = () => of(student)
    expect(effects.saveStudent$).toBeObservable(expected)
  })
})
