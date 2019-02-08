import { Injectable } from '@angular/core';
import { Student, StudentsResult, Subject } from '../_models/overview-models';
import { environment } from 'src/environments/environment';
import { Observable, of, MonoTypeOperatorFunction } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // internal database because no back-end
  private _students: Array<Student>
  private _subjects: Array<Subject>

  constructor() {
    let data = Generator.generateData(500)
    this._students = data.students
    this._subjects = data.subjects
  }

  // get api/subjects
  public getSubjects() : Observable<Array<Subject>> {
    return new Observable<Array<Subject>>((observer) => {
      observer.next(this._subjects)
      observer.complete()
    }).pipe(this.delay())
  }

  // post api/students
  public createStudent(student: Student): Observable<Student> {
    return new Observable<Student>((observer) => {
      student.id = Math.max(...this._students.map(s => s.id)) + 1
      this._students.push(student)
      let result = student
        observer.next(result)
        observer.complete()
    }).pipe(this.delay())
  }

  // put api/students/:id
  public updateStudent(student: Student): Observable<Student> {
    return new Observable<Student>((observer) => {
      let index = this._students.findIndex(s => s.id === student.id)
      let result: Student
      if (index !== -1) {
        this._students[index] = student
        result = student
      } else {
        result = student
      }
      observer.next(result)
      observer.complete()
    }).pipe(this.delay())
  }

  // del api/students/:id
  public deleteStudent(id: number): Observable<Student> {
    return new Observable<Student>((observer) => {
      let index = this._students.findIndex(s => s.id === id)
      let result = index === -1 ? null : this._students.splice(index, 1)[0]
      observer.next(result)
      observer.complete()
    }).pipe(this.delay())
  }

  // get api/students/:id
  public getStudentById(id: number): Observable<Student> {
    return new Observable<Student>((observer) => {
      let student = this._students.filter(s => s.id === id)
      let result = student.length > 0 ? student[0] : null
      observer.next(result)
      observer.complete()
    }).pipe(this.delay())
  }

  // get api/students?page={page}&records={recordsPerPage}
  public getStudents(studentsPerPage: number, page: number, filter: string): Observable<StudentsResult> {
    return new Observable<StudentsResult>((observer) => {
      filter = (filter || '').trim()
      let active = this._students.filter(s => !s.deleted)
      let filtered = !filter ? active : active.filter(s => this.isMatch(s, filter))
      let startIndex = studentsPerPage * (page - 1)
      let result = <StudentsResult>{
        page: page,
        recordsPerPage: studentsPerPage,
        totalRecords: active.length,
        students: startIndex > filtered.length - 1 ? [] :
        filtered.slice(startIndex, startIndex + studentsPerPage)
      }
      observer.next(result)
      observer.complete()
    }).pipe(this.delay())
  }

  private delay<T>() : MonoTypeOperatorFunction<T> {
    return delay(environment.apiSimulationDelay)
  }

  private isMatch(student: Student, filter: string): boolean {
    return (filter).split(' ').every(f =>
      this.isStringIncluded(student.firstName, f)
      || this.isStringIncluded(student.lastName, f)
      || this.isStringIncluded(student.id.toString(), f)
    )
  }

  private isStringIncluded(str: string, filter: string) : boolean {
    filter = (filter || '').trim()
    if (!filter) {
      return true
    }
    let match = false
    str = str.toLowerCase()
    return str.includes(filter)
  }
}

// Helper class for generating database
class Generator {
  static readonly fn: Array<string> = [
    'Franc', 'Janez', 'Ivan', 'Anton', 'Marko', 'Andrej', 'Jožef', 'Jože', 'Luka', 'Peter',
    'Marija', 'Ana', 'Maja', 'Irena', 'Mojca', 'Mateja', 'Nina', 'Nataša', 'Andreja', 'Barbara'
  ]

  static readonly ln: Array<string> = [
    'Novak', 'Horvat', 'Kovačič', 'Krajnc', 'Zupančič', 'Potočnik', 'Kovač', 'Mlakar', 'Kos', 'Vidmar',
    'Golob', 'Turk', 'Kralj', 'Božič', 'Korošec', 'Bizjak', 'Zupan', 'Hribar', 'Kotnik', 'Kavčič'
  ]

  static readonly ts: Array<string> = ['dr.', 'prof. dr.', 'doc. dr.', 'izr. prof. dr.', 'viš. pred. dr.']

  static readonly sb: Array<string> = [
    'Programiranje 1', 'Diskretne strukture', 'Računalniška arhitektura', 'Uvod v računalništvo', 'Matematika',
    'Podatkovne baze', 'Računalniške komunikacije', 'Operacijski sistemi', 'Osnove verjetnosti in statistike',
    'Programiranje 2', 'Računalniška grafika', 'Umetna inteligenca', 'Programski jezik C', 'Digitalna vezja',
    'Algoritmi in podatkovne strukture 1', 'Organizacija računalnikov', 'Tehnične veščine', 
    'Komunikacijski protokoli in omrežna varnost', 'Grafično oblikovanje', 'Digitalno procesiranje signalov',
    'Informacijski sistemi', 'Podatkovne baze 2', 'Elektronsko in mobilno poslovanje', 'Testiranje in kakovost',
    'Algoritmi in podatkovne strukture 2', 'Prevajalniki in navidezni stroji', 'Uporabniški vmesniki',
    'Podatkovno rudarjenje', 'Načrtovanje digitalnih naprav', 'Vhodno izhodne naprave', 'Tehnične veščine 2',
    'Spletne tehnologije', 'Produkcija multimedijskih gradiv', 'Razvoj informacijskih sistemov',
    'Tehnologija programske opreme', 'Numerične metode', 'Odločitveni sistemi', 'Robotika in računalniško zaznavanje',
    'Tehnologija iger in navidezna resničnost', 'Vgrajeni sistemi', 'Procesna avtomatika', 'Sistemska programska oprema',
    'Vzporedni in porazdeljeni sistemi in algoritmi', 'Multimedijske tehnologije']

  public static generateData(number: number = 100): { students: Array<Student>, subjects: Array<Subject> } {
    let students = new Array<Student>()
    let subjects = this.generateSubjects()
    let regNumber = 66000001 //FRI: 66
    let studentSubjects: Array<Subject>
    let subject: Subject
    for (let i = 0; i < number; i++) {
      studentSubjects = new Array<Subject>()
      // lets assume each student is attending between 10 and 14 subjects
      for (let j = 0; j < (Math.random() * 5 + 10); j++) {
        do { // avoid duplicated subjects
          subject = subjects[Math.floor(Math.random() * subjects.length)]
        } while (studentSubjects.some(s => s.id === subject.id))
        studentSubjects.push(subject)
      }
      students.push(<Student>{
        id: regNumber + i,
        firstName: this.getRandomFirstName(),
        lastName: this.getRandomLastName(),
        year: Math.floor(Math.random() * 3 + 1),
        subjects: studentSubjects
      })
    }
    return { students, subjects }
  }

  private static generateSubjects() : Array<Subject> {
    let list = new Array<Subject>()
    this.sb.sort().forEach((s, i) => {
      list.push(<Subject>{
        id: i+1,
        name: s,
        lecturer: `${this.getRandomTitle()} ${this.getRandomFirstName()} ${this.getRandomLastName()}`
      })
    })
    return list
  }

  private static getRandomFirstName() : string {
    return this.fn[Math.floor(Math.random() * this.fn.length)]
  }

  private static getRandomLastName() : string {
    return this.ln[Math.floor(Math.random() * this.ln.length)]
  }

  private static getRandomTitle() : string {
    return this.ts[Math.floor(Math.random() * this.ts.length)]
  }
}
