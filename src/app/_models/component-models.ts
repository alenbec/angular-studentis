import { State } from '../_store'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export class BaseComponent {

  state$: Observable<any>

  constructor(
    protected authService: AuthService,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    stateName: string = 'main'
  ) {
    this.state$ = store.select(stateName)
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

