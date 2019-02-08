import { State } from '../_store'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export class BaseComponent {

  state$: Observable<any>

  constructor(
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public store: Store<State>,
    stateName: string = 'main'
  ) {
    this.state$ = store.select(stateName)
  }

  get isAuthenticated() : boolean {
    return this.authService.isAuthenticated()
  }

  get user() : object {
    return this.authService.user()
  }

  extractNumberFromParam(paramName: string): number {
    let value = this.getParam(paramName) as any
    if(value && !isNaN(value)){
      return parseInt(value)
    }
    return null
  }

  private getParam(paramName: string): string {
    return this.activatedRoute.snapshot.paramMap.get(paramName)
  }
}

