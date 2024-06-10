import { GridItem } from "./grid-item";

export interface PaymentElement{
    name:string;
    amount:number;
    code:number;
    grid: GridItem[]
}