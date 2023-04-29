import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules */
import { BootstrapModule } from 'src/app/shared/bootstrap.module';
/* Directives */
import { NgInitDirective } from '../directives/ng-init.directive';
/* Pipes */
import { SafeHtmlPipe } from './pipes/safe-html';

@NgModule({
  declarations: [
    /* Directives */
    NgInitDirective,

    /* Pipes */
    SafeHtmlPipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BootstrapModule],
  exports: [
    /* Modules */
    BootstrapModule,
    /* Directives */
    NgInitDirective,

    /* Pipes */
    SafeHtmlPipe,
  ],
})
export class SharedModule {}
