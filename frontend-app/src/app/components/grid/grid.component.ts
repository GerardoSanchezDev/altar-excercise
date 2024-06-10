import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  grid$!: Observable<any>;
  data:any={};
  generatorRunning:boolean=false
  biasCharacter = new FormControl('')
  mockArray:number[]=[0,1,2,3,4,5,6,7,8,9]

  characterSubscription: Subscription = new Subscription;

  constructor(private socket: WebSocketService) {}

  ngOnInit(): void {
    this.characterSubscription=this.biasCharacter.valueChanges.pipe(
      debounceTime(4000),
      distinctUntilChanged()
    ).subscribe(newCharacter=>{
      this.socket.emitBiasCharacter(newCharacter!)
    })
  }

  startGenerator(){
    this.generatorRunning=true
    this.join()
    this.grid$ = this.socket.getGrid().pipe(map((response)=>{
      this.data=response
      return response
    }))
  }
  stopGenerator(){
    this.generatorRunning=false
    this.socket.emitExit()
    this.grid$=new Observable
  }

  sendBias(){

  }


  findGridItem(column:number, row:number):string{
    return this.data?.grid?.find((gridItem:any)=>gridItem.column==column && gridItem.row==row).character
  }

  join() {
    this.socket.emitUser({
      id: null,
    });
  }

  ngOnDestroy() {
    this.socket.emitExit();
  }

}