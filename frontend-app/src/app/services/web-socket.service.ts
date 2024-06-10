import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {}

  emitUser(user: any): void {
    this.socket.emit('add-user', user);
  }

  emitBiasCharacter(character:string):void{
    this.socket.emit('set-bias-character',{character: character})
  }

  emitPayment(payment:any):void{
    this.socket.emit('save-payment',{payment: payment})
  }

  emitExit(): void {
    this.socket.emit('exit');
  }

  getClientId(): Observable<string> {
    return this.socket.fromEvent('user-id');
  }

  getGrid(): Observable<any>{
    return this.socket.fromEvent<any>('get-grid')
  }
  
  getUsersOnline(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('users-online');
  }

  getPayments(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('get-payments');
  }
}
