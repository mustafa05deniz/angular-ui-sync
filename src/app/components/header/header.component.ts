import { AuthService } from 'src/app/core/auth.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class Header {
  loggedIn: boolean;
  constructor(private authService: AuthService, private router: Router, private cdk: ChangeDetectorRef) {
    this.authService.authentication.subscribe((res: any) => {
      this.loggedIn = res;
      this.cdk.detectChanges();
    });
  }

  get user() {
    return this.authService.getUser()
  }

  login() {
    this.router.navigate(['login'])
  }

  logOut() {
    this.authService.logOut()
  }
}
