import { GridItem } from "../interfaces/grid-item";
import { PaymentElement } from "../interfaces/payment-element";

export class Payment{
    private static paymentList: PaymentElement[] = [];
  
    private constructor() {}
  
    public static getPaymentList() {
      return this.paymentList;
    }
  
    public static addUser(payment: any) {
      this.paymentList.push(payment);
    }
}