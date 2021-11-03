import * as NavbarLinkActions from '../actions/navbar-links.action'
import { NavbarLink } from '../_models/navbar-link.model';

export interface NavbarLinkState {
  navbarLinks: NavbarLink[];
}

const initialState: NavbarLinkState = {
  navbarLinks: [
    { link: '/', text: 'Home' },
    { link: '/login', text: 'Login' },
    { link: '/register', text: 'Criar Conta' },
  ],
};

export function navbarLinksReducer(
  state: NavbarLinkState = initialState,
  action: NavbarLinkActions.AllActions,
): NavbarLinkState {
  switch (action.type) {
    case NavbarLinkActions.LINKS_NOT_LOGGED_LOAD:
      return { navbarLinks: action.navbarLinks };
    case NavbarLinkActions.LINKS_USER_LOGGED_LOAD:
      return { navbarLinks: action.navbarLinks };
    case NavbarLinkActions.LINKS_ADMIN_LOGGED_LOAD:
      return { navbarLinks: action.navbarLinks };
    default:
      return state;
  }
}