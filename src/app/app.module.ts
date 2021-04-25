import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LogsComponent } from './logs/logs.component';
import {TableModule} from 'primeng/table';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path:"logs",component: LogsComponent},
  {path:"**",redirectTo:"/not-found"}
]

@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
