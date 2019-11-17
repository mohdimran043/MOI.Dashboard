import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';
import { DBkeys } from './db-keys';
import { RoleUrlMapping } from '../theme/layout/admin/navigation/navigation';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {

    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    let isRouteAllowed = false;

    if (this.authService.isLoggedIn) {
      let user = JSON.parse(window.sessionStorage.getItem(DBkeys.CURRENT_USER));
      let user_roles = user ? Array.from(user["roles"]) : [];

      let filteredRoleUrlMapping = RoleUrlMapping.filter(item => user_roles.findIndex(ele => ele === item.role) != -1);

      isRouteAllowed = filteredRoleUrlMapping.map(item => item.url)
                        .findIndex(itemUrl => itemUrl.indexOf(url) != -1)
                        != -1;

      if(!isRouteAllowed) this.router.navigate(['/notauthorized']);

      return isRouteAllowed;
    }

    this.authService.loginRedirectUrl = url;
    this.router.navigate(['/']);

    return isRouteAllowed;
  }
}
