import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './components/grid/grid.component';

import { CurrencyMaskModule } from "ng2-currency-mask";

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
