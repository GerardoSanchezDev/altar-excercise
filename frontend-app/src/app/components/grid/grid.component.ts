import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  grid$!: Observable<any>;
  payments$!: Observable<any>
  data:any={};
  generatorRunning:boolean=false
  biasCharacter = new FormControl('')
  mockArray:number[]=[0,1,2,3,4,5,6,7,8,9]
  paymentList:any
  formPayment: FormGroup = new FormGroup([])

  characterSubscription: Subscription = new Subscription;

  constructor(
    private socket: WebSocketService,
    private fb: FormBuilder
  ) {
    this.formPayment=this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.characterSubscription=this.biasCharacter.valueChanges.pipe(
      debounceTime(4000),
      distinctUntilChanged()
    ).subscribe(newCharacter=>{
      this.socket.emitBiasCharacter(newCharacter!)
    })
    this.payments$ = this.socket
      .getPayments()
      .pipe(
        map((payments)=>payments));  
    
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

  sendPayment(){
    let paymentObj = {
      name: this.formPayment.get('name')!.value, 
      amount: this.formPayment.get('amount')!.value,
      code: this.data.secretCode,
      grid: this.data.grid
    }
    this.socket.emitPayment(paymentObj)
    this.formPayment.markAsPristine()
    this.formPayment.reset()
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