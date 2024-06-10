import { GridItem } from "../interfaces/grid-item";
import { PaymentElement } from "../interfaces/payment-element";

export class Payment{
    private static paymentList: any[] = [];
  
    private constructor() {}
  
    public static getPaymentList() {
      return this.paymentList;
    }
  
    public static savePayment(payment: any) {
      this.paymentList.push(payment);
    }
}