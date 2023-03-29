import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BroadCastService } from './broadcast.service';

const USER_KEY = 'md-auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authentication = new Subject<Boolean>();
  constructor(
    private broadCastService: BroadCastService,
    private router: Router
  ) {
    this.broadCastService.onMessage.subscribe((payload) => {
      if (payload.type === 'auth/login') {
        setTimeout(() => {
          this.router.navigate(['/pages/user']);
        }, 100);
        this.authentication.next(true);
      } else if (payload.type === 'auth/logOut') {
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 100);
        this.authentication.next(false);
      }
    });
  }

  signOut(): void {
    window.localStorage.clear();
  }


  public login(user: any): void {
    this.authentication.next(true);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.router.navigate(['/pages/user'])
    this.broadCastService.publish({
      type: 'auth/login',
      payload: user,
    });
  }

  public logOut(): void {
    this.authentication.next(false);
    window.localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login'])

    this.broadCastService.publish({
      type: 'auth/logOut',
      payload: null,
    });
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
