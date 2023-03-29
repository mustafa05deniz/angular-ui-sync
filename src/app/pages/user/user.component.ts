import { BroadCastService } from './../../core/broadcast.service';
import { ThemeService } from './../../core/theme.service';
import { AuthService } from 'src/app/core/auth.service';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public user: any;
  public selectedTheme: string = 'light';
  constructor(private authService: AuthService, private themeService: ThemeService, private broadCastService: BroadCastService) {
    this.user = authService.getUser()
  }

  toogleTheme() {
    this.selectedTheme = this.selectedTheme === 'light' ? 'dark' : 'light'
    this.themeService.updateCurrentMode(this.selectedTheme)
    this.broadCastService.publish({
      type: 'settings/theme',
      payload: this.selectedTheme,
    });
  }

}
