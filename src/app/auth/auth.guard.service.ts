import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../core/storageService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private storageService: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.storageService.getItem<string>('role'); 

    if(role){
      return true;
    }

    // Redirect to the home page if the role doesn't match
    this.router.navigate(['/']);
    return false;
  }
}