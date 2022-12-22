import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { Roles } from './core/user/user.types';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  private roles: Roles[];
  constructor(authService: AuthService){
    if(authService == undefined){
      
    }
this.roles=authService.getRol();

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAtuhorized(route);
  }
  
  private isAtuhorized(route:ActivatedRouteSnapshot): boolean{
    const expectedRoles = route.data.expectedRoles;
    const roleMatches = this.roles.findIndex(role => expectedRoles.indexOf(role) !== -1);

    return (roleMatches < 0)? false:true;
  }

}
