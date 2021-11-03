import { Component } from '@angular/core';
import { NavbarLink } from '../../../_models/navbar-link.model';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  links: NavbarLink[] = [{ link: '', text: '' }];

  constructor(private store: Store<AppState>, public auth: AuthService) {
    store.select('links').subscribe(
      ({ navbarLinks }) => this.links = navbarLinks,
    );
  }

}
