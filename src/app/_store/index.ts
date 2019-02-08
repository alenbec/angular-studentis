import * as fromApp from './app.reducer'
import * as fromOverview from './overview/overview.reducer'
import { ActionReducerMap } from '@ngrx/store';
import { OverviewEffects } from './overview/overview.effects';

export interface State {
    main: fromApp.AppState,
    overview: fromOverview.OverviewState
}

export const reducers: ActionReducerMap<State> = {
    main: fromApp.reducer,
    overview: fromOverview.reducer
}

export const effects = [OverviewEffects]