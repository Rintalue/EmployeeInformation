import { NgModule } from '@angular/core';
import{RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";

const appRoutes: Routes=[
  {path: '', component: DashboardComponent},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)

  ]
})
export class AppRoutingModule { }
