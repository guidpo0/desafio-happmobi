import { NavbarLinkState, navbarLinksReducer } from './navbar-links.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  links: NavbarLinkState,
}

export const reducers: ActionReducerMap<AppState, any> = {
  links: navbarLinksReducer,
};
