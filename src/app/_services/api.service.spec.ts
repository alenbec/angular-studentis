import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Student } from '../_models/overview-models';
import produce from "immer"

describe('ApiService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(TestBed.get(ApiService)).toBeTruthy();
  });

  it('should contain 500 students on initialization', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => expect(data.students.length).toBe(500)),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should throw error when studentsPerPage parameter is null', () => {
    let service = new ApiService()
    service.getStudents(null, 1, null)
    .pipe(
      map((data) => fail('This one succeed although it shouldn\'t')),
      catchError((err) => of(expect(err).toBeTruthy()))
    ).subscribe()
  })

  it('should throw error when page parameter is null', () => {
    let service = new ApiService()
    service.getStudents(1, null, null)
    .pipe(
      map((data) => fail('This one succeed although it shouldn\'t')),
      catchError((err) => of(expect(err).toBeTruthy()))
    ).subscribe()
  })

  it('should return same dataset each time it gets called', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data1) => service.getStudents(1000, 1, null)
        .pipe(
          map((data2) => {
            let s2: Student
            try {
              data1.students.forEach((s1, index) => {
                s2 = data2.students[index]
                if (s1.firstName !== s2.firstName || s1.lastName !== s2.lastName) {
                  throw `${index} ${s1.id} ${s1.firstName} ${s1.lastName} != ${s2.id} ${s2.firstName} ${s2.lastName}`
                }
              })
            } catch (e) {
              return fail(e)
            }
            expect()
          })
        ).subscribe()),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should return only filtered results', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => {
        // get random student's name and use it as filter
        let randomFirstName = data.students[Math.floor(Math.random() * data.students.length)].firstName.toLowerCase()
        // calculate expected number of results based by filter
        let expectedCount = data.students.filter(s =>
          s.firstName.toLowerCase().includes(randomFirstName)
          || s.lastName.toLowerCase().includes(randomFirstName)
          || s.id.toString().includes(randomFirstName)).length
        return service.getStudents(1000, 1, randomFirstName)
        .pipe(
          map((data) => expect(data.students.length).toBe(expectedCount))
        ).subscribe()
      }),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should return deleted student', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => {
        let studentToDelete = data.students[Math.floor(Math.random() * data.students.length)]
        return service.deleteStudent(studentToDelete.id)
        .pipe(
          map((deletedStudent) => expect(deletedStudent.id === studentToDelete.id).toBe(true))
        ).subscribe()
      }),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should raise exception if queried deleted user', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => {
        let studentToDelete = data.students[Math.floor(Math.random() * data.students.length)]
        return service.deleteStudent(studentToDelete.id)
        .pipe(
          map((deletedStudent) =>
            service.getStudentById(deletedStudent.id)
            .pipe(
              map((student) => fail(`Expected exception but got ${student}`)),
              catchError((err) => of(expect(err).toBeTruthy()))
            ).subscribe()
          )
        ).subscribe()
      }),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should return one user less after one student gets deleted', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => {
        let studentToDelete = data.students[Math.floor(Math.random() * data.students.length)]
        return service.deleteStudent(studentToDelete.id)
        .pipe(
          map(() => service.getStudents(1000, 1, null)
            .pipe(
              map((newData) => expect(newData.students.length).toBe(data.students.length-1) )
            ).subscribe()
          )
        ).subscribe()
      }),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should return array of students without deleted student', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => {
        let studentToDelete = data.students[Math.floor(Math.random() * data.students.length)]
        return service.deleteStudent(studentToDelete.id)
        .pipe(
          map(() => service.getStudents(1000, 1, null)
            .pipe(
              map((newData) => expect(newData.students.filter(s => s.id == studentToDelete.id).length).toBe(0) )
            ).subscribe()
          )
        ).subscribe()
      }),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should update student properties', () => {
    let service = new ApiService()
    service.getStudents(1000, 1, null)
    .pipe(
      map((data) => {
        let studentSource = data.students[Math.floor(Math.random() * data.students.length)]
        let studentModified = produce(studentSource, draftStudent => {
          draftStudent.firstName = 'Johnny'
          draftStudent.lastName = 'Bravo'
          draftStudent.year = 5
          draftStudent.subjects = []
        })
        return service.updateStudent(studentModified)
        .pipe(
          map(() => service.getStudentById(studentModified.id)
            .pipe(
              map((updatedStudent) => {
                if(updatedStudent.id === studentModified.id &&
                  updatedStudent.firstName === studentModified.firstName &&
                  updatedStudent.lastName === studentModified.lastName &&
                  updatedStudent.year === studentModified.year &&
                  updatedStudent.subjects.length === studentModified.subjects.length) {
                    return expect()
                  }
                  fail('Updated student does not match the one that was provided to update')
              })
            ).subscribe()
          )
        ).subscribe()
      }),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })

  it('should return subjects', () => {
    let service = new ApiService()
    service.getSubjects()
    .pipe(
      map((data) => expect(data.length).toBeGreaterThan(0)),
      catchError((err) => of(expect(err).toBeFalsy()))
    ).subscribe()
  })
});
