import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NgxUIModule } from '@swimlane/ngx-ui';



@NgModule({
  declarations: [
    LayoutComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    NgxUIModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
