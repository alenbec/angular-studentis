export class Subject {
  id: number
  name: string
  lecturer: string
}

export class Student {
  id: number
  firstName: string
  lastName: string
  year: number
  subjects: Array<Subject>
  deleted: boolean

  addSubject(subject: Subject): boolean {
    if (!this.hasSubject(subject)) {
      this.subjects.push(subject)
      return true
    }
    return false
  }

  removeSubject(subject: Subject): boolean {
    if (this.hasSubject(subject)) {
      this.subjects.splice(this.subjects.indexOf(subject), 1)
      return true
    }
    return false
  }

  private hasSubject(subject: Subject): boolean {
    return this.subjects.indexOf(subject) !== -1
  }
}

export class StudentsResult {
  public page: number
  public recordsPerPage: number
  public totalRecords: number
  public totalFilteredRecords: number
  public students: Array<Student>
}
