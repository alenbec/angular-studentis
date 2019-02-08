import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/_models/component-models';
import { AuthService } from 'src/app/_services/auth.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/_store';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/_models/overview-models';
import { OverviewActionTypes } from 'src/app/_store/overview/overview.actions';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    activatedRoute: ActivatedRoute,
    store: Store<State>,
    authService: AuthService,
    private router : Router,
    private confirmationService: ConfirmationService) {
    super(authService, activatedRoute, store, 'overview')
  }

  displayName(student: Student) : string {
    return `${student.firstName} ${student.lastName}`
  }

  back() : void {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    })
  }

  delete(student: Student) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${student.firstName} ${student.lastName}?`,
      accept: () => this.store.dispatch({
        type: OverviewActionTypes.DeleteStudent,
        id: student.id
      })
    })
  }

  edit() : void {
    this.router.navigate(['./edit'], {
      relativeTo: this.activatedRoute
    })
  }

  ngOnInit() {
    this.store.dispatch({
      type: OverviewActionTypes.LoadStudent,
      id: this.extractNumberFromParam('id')
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch({
      type: OverviewActionTypes.ClearStudent
    })
  }
}
