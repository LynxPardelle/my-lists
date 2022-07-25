import { Component, Input, OnInit } from '@angular/core';
import itemListInterface from '../interfaces/itemList';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemList!: itemListInterface;

  constructor() {}

  ngOnInit(): void {}

  checkForClass() {
    let bgType = { 'bef-bg-success__OPA__0_33': true };
    return bgType;
  }
}
