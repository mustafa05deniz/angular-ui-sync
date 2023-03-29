import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
