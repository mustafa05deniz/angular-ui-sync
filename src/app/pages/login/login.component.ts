import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private cdk: ChangeDetectorRef
  ) {
    this.authService.authentication.subscribe((res: any) => {
      this.loggedIn = res;
      this.cdk.detectChanges();
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.broadCastService.publish({
      type: 'auth/login',
      payload: this.loginForm.value,
    });
    this.authService.login(this.loginForm.value);
  }

  logOut() {
    this.authService.logOut();
  }
}
