import { Component, OnInit } from '@angular/core';
import { State } from '../_store';
import { Store } from '@ngrx/store';
import { AuthService } from '../_services/auth.service';
import { BaseComponent } from '../_models/component-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  constructor(
    authService: AuthService,
    activatedRoute: ActivatedRoute, 
    store: Store<State>) {
    super(authService, activatedRoute, store)
  }

  get user(): object {
    return this.authService.user()
  }

  get userProperties(): Array<object> {
    let keys = Object.keys(this.user)
    let props = keys.map(k => {
      return {
        key: k,
        value: this.user[k]
      }
    });
    return props
  }

  ngOnInit() {
  }

}
