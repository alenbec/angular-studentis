import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { State } from '../_store';
import { OverviewActionTypes } from '../_store/overview/overview.actions';
import { Subscription, of } from 'rxjs';
import { ApiService } from '../_services/api.service';
import { AuthService } from '../_services/auth.service';
import { BaseComponent } from '../_models/component-models';
import { Student } from '../_models/overview-models';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent extends BaseComponent implements OnInit {

  rows: number = 20
  first: number
  filter: string
  subDelete: Subscription

  constructor(
    authService: AuthService,
    activatedRoute: ActivatedRoute,
    store: Store<State>,
    private api: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private updates$: Actions) {
    super(authService, activatedRoute, store, 'overview')
  }

  loadStudentsLazy(first: number) {
    this.first = first
    this.store.dispatch({
      type: OverviewActionTypes.LoadStudents,
      page: Math.floor((this.first / this.rows)) + 1,
      rows: this.rows,
      filter: this.filter
    })
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${student.firstName} ${student.lastName}?`,
      accept: () => this.store.dispatch({
        type: OverviewActionTypes.DeleteStudent,
        id: student.id
      })
    })
  }

  editStudent(student: Student) {
    this.store.dispatch({
      type: OverviewActionTypes.EditStudent,
      student: student
    })
  }

  add() {
    this.store.dispatch({
      type: OverviewActionTypes.NewStudent
    })
  }

  viewStudent(student: Student) {
    this.store.dispatch({
      type: OverviewActionTypes.LoadStudentSuccess,
      student:student
    })
    this.router.navigate([`./${student.id}`], {
      relativeTo: this.activatedRoute
    })
  }

  ngOnInit() {
    this.subDelete = this.updates$.pipe(
      ofType(OverviewActionTypes.DeleteStudentSuccess),
      map(() => this.loadStudentsLazy(this.first))
    ).subscribe()
  }

  onDestroy() {
    this.subDelete.unsubscribe()
  }
}
