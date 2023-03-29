import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { BroadCastService } from 'src/app/core/broadcast.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class Login {
  loggedIn: boolean = false;
  loginForm = this.fb.group({
    email: ['a@b.com', [Validators.required, Validators.email]],
    password: ['1231', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private broadCastService: BroadCastService,
    private authService: AuthService,
    private cdk: ChangeDetectorRef,
    private router: Router,
  ) {
    this.authService.authentication.subscribe((res: any) => {
      this.loggedIn = res;
      this.router.navigate(['/pages/user'])
      this.cdk.detectChanges();
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value);
  }

  logOut() {
    this.broadCastService.publish({
      type: 'auth/logOut',
      payload: null,
    });
    this.authService.logOut();
  }
}
