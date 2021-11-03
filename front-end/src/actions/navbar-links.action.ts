import { Action } from "@ngrx/store";
import { NavbarLink } from "src/_models/navbar-link.model";

export const LINKS_NOT_LOGGED_LOAD = "[NAVBAR_LINKS] Load not logged";
export const LINKS_USER_LOGGED_LOAD = "[NAVBAR_LINKS] Load user logged";
export const LINKS_ADMIN_LOGGED_LOAD = "[NAVBAR_LINKS] Load admin logged";

interface NavbarLinkActions {
  navbarLinks: NavbarLink[],
  payload: NavbarLink[],
}

export class NavbarLinksNotLogged implements Action {
  readonly type = LINKS_NOT_LOGGED_LOAD;
  
  navbarLinks: NavbarLink[] = [
    { link: '/', text: 'Home' },
    { link: '/login', text: 'Login' },
    { link: '/register', text: 'Criar Conta' },
  ];

  constructor(public payload: NavbarLink[]) { }
}

export class NavbarLinksUserLogged implements Action {
  readonly type = LINKS_USER_LOGGED_LOAD;
  
  navbarLinks: NavbarLink[] = [
    { link: '/', text: 'Home' },
    { link: '/cars-available', text: 'Carros Disponíveis' },
    { link: '/rents', text: 'Meus Aluguéis' },
    { link: '/profile', text: 'Perfil' },
  ];

  constructor(public payload: NavbarLink[]) { }
}

export class NavbarLinksAdminLogged implements Action {
  readonly type = LINKS_ADMIN_LOGGED_LOAD;

  navbarLinks: NavbarLink[] = [
    { link: '/admin', text: 'Admin' },
    { link: '/', text: 'Home' },
    { link: '/cars-available', text: 'Carros Disponíveis' },
    { link: '/rents', text: 'Meus Aluguéis' },
    { link: '/profile', text: 'Perfil' },
  ];

  constructor(public payload: NavbarLink[]) { }
}

export type AllActions = NavbarLinksNotLogged | NavbarLinksUserLogged | NavbarLinksAdminLogged;