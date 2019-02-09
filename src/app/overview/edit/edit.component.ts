import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/_models/component-models';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/_store';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { OverviewActionTypes, SaveStudentSuccess } from 'src/app/_store/overview/overview.actions';
import { MessageService, SelectItem } from 'primeng/api';
import { Student, Subject } from 'src/app/_models/overview-models';
import { pluck } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [MessageService, FormBuilder]
})
export class EditComponent extends BaseComponent implements OnInit, OnDestroy {

  studentForm: FormGroup
  years: Array<SelectItem> = [
    { label: 'Select year of study', value: -1 },
    { label: '1.', value: 1 },
    { label: '2.', value: 2 },
    { label: '3.', value: 3 }
  ]
  student: Student
  subSuccess: Subscription
  subStudent: Subscription
  subjects$: Observable<Array<Subject>>

  constructor(
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    store: Store<State>,
    private api: ApiService,
    private router : Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private updates$: Actions) {
    super(authService, activatedRoute, store, 'overview')
  }

  get edit() : boolean {
    return this.studentForm && this.studentForm.value.id
  }

  ngOnInit() {
    // load student if id is given
    let id = this.extractNumberFromParam('id')
    if (id) {
      this.store.dispatch({
        type: OverviewActionTypes.LoadStudent,
        id: this.extractNumberFromParam('id')
      })
    }

    let url = this.router.url
    this.subStudent = this.state$.pipe(pluck('student'))
    .subscribe((student: Student) => {
      if (!student.id && url !== '/overview/new') {
        return
      }

      // initialize form when student is assigned
      let edit = student.id && student.id > -1
      if (!this.studentForm) {
        this.studentForm = this.fb.group({
          'id': new FormControl(student.id || ''),
          'firstName': new FormControl({ value: student.firstName, disabled: edit }, Validators.required),
          'lastName': new FormControl({ value: student.lastName, disabled: edit }, Validators.required),
          'year': new FormControl({ value: student.year, disabled: edit }, [Validators.required, Validators.min(1)]),
          'subjects': new FormControl(student.subjects)
        })
      }

      // we've got student, now load list of all subjects and filter them
      this.subjects$ = this.api.getSubjects()
      .pipe(
        map((subjects) => { // only include those which the student is not attending
          let ids = subjects.map(s => s.id)
          let existing = (this.studentForm.value.subjects as Subject[]).map(s => s.id)
          return subjects.filter(s => !existing.includes(s.id))
        })
      )
    })

    // react when save succeedes
    this.subSuccess = this.updates$.pipe(
      ofType(OverviewActionTypes.SaveStudentSuccess),
      map((action: SaveStudentSuccess) => {
        let url = this.edit ? '../' : `../${action.student.id}`
        this.router.navigate([url], {
          relativeTo: this.activatedRoute
        })
      })
    ).subscribe()
  }

  back() : void {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    })
  }

  onSubmit() {
    this.messageService.add({
      severity: 'info',
      summary: this.edit ? 'Saving' : 'Creating',
      detail: `Please wait while student is ${ this.edit ? 'saving' : 'creating' }`
    });
    this.store.dispatch({
      type: OverviewActionTypes.SaveStudent,
      student: this.studentForm.getRawValue() as Student
    })
  }

  ngOnDestroy() {
    this.subStudent.unsubscribe()
    this.subSuccess.unsubscribe()
  }
}
