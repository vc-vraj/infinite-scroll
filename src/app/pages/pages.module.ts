import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UsersComponent
  ]
})
export class PagesModule { }
