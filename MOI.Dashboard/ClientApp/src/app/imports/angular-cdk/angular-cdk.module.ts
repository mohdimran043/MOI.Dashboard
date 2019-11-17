import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    DragDropModule,
    ScrollingModule
  ],
  exports: [
    DragDropModule,
    ScrollingModule
  ]
})
export class AngularCdkModule { }
