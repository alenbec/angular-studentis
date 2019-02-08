import { Component, OnInit } from '@angular/core';
import { State } from '../_store'
import { Store } from '@ngrx/store';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../_models/component-models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends BaseComponent implements OnInit {

  constructor(
    authService : AuthService, 
    activatedRoute: ActivatedRoute,
    store: Store<State>) {
    super(authService, activatedRoute, store)
  }

  logout() : void {
    this.authService.logout()
  }

  ngOnInit() {
  }
}
