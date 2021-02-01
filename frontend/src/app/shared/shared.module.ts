import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { LinkButtonComponent } from './components/link-button/link-button.component';

@NgModule({
  declarations: [LinkButtonComponent],
  imports: [
    CommonModule,
    ClipboardModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    LinkButtonComponent,
    CommonModule,
    ClipboardModule,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
