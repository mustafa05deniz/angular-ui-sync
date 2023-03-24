import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';

interface BroadcastMessage {
  type: string;
  payload: any;
}
@Injectable({
  providedIn: 'root',
})
export class BroadCastService {
  public broadcastChannel: BroadcastChannel;
  public onMessage = new Subject<any>();

  constructor() {
    this.broadcastChannel = new BroadcastChannel('mdChannel');
    this.broadcastChannel.onmessage = (message) => {
      this.onMessage.next(message.data);
    };
  }

  publish(message: BroadcastMessage): void {
    this.broadcastChannel.postMessage(message);
  }
}
