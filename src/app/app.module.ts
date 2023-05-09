import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterOutlet} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FilterPipe } from './Pipes/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterPipe,

  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        ReactiveFormsModule,
      FormsModule,
      HttpClientModule,


    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
