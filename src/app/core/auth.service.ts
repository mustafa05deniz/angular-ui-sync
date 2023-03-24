import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BroadCastService } from './broadcast.service';

const TOKEN_KEY = 'md-auth-token';
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
        this.router.navigate(['home']);
        this.authentication.next(true);
      } else if (payload.type === 'auth/logOut') {
        this.router.navigate(['login']);
        this.authentication.next(false);
      }
    });
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public login(user: any): void {
    this.authentication.next(true);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public logOut(): void {
    this.authentication.next(false);
    window.localStorage.removeItem(USER_KEY);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
