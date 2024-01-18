import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSecretaryService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user= localStorage.getItem('user')
    // Check your user's permissions here
    // For example, you can check a cookie or a service that holds user information and permissions

    if(user!=undefined) {
      const hasPermission = JSON.parse(user).role == 'secretary'/* Check if the user has the required permission */;
      if (hasPermission) {
        return true;
      }else if(JSON.parse(user).role == 'secretary'){
        this.router.navigate(['secretary']);
        return false;
      }
      else {
        // Redirect to a page or show an error message if the user doesn't have permission
        this.router.navigate(['']);
        return false;
      }
    }else{
      this.router.navigate(['']);
      return false
    }

  }
}
