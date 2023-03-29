import { BroadCastService } from './broadcast.service';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentMode: string = "LIGHT";
  private modeChangedSubject = new BehaviorSubject(this.currentMode);
  constructor(@Inject(DOCUMENT) private document: Document, private broadCastService: BroadCastService) {
    this.broadCastService.onMessage.subscribe((payload) => {
      if (payload.type === 'settings/theme') {
        this.updateCurrentMode(payload.payload)
      }
    });
  }

  public updateCurrentMode(mode: string) {
    this.currentMode = mode;
    this.modeChangedSubject.next(this.currentMode);
    this.document.body.classList.remove(this.document.body.classList[0])
    this.document.body.classList.add(this.currentMode)
  }
}
