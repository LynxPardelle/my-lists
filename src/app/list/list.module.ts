import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Components */
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
@NgModule({
  declarations: [ListComponent, ItemComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [ListComponent, ItemComponent],
})
export class ListModule {}
