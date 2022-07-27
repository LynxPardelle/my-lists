import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

/* Interfaces */
import itemListInterface from '../interfaces/itemList';
import optionInterface from '../interfaces/option';

/* NGX-Bootstrap */
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

/* BEFService */
import { NgxBootstrapExpandedFeaturesService as BefService } from 'ngx-bootstrap-expanded-features';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [
    BefService,
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class ItemComponent implements OnInit {
  public inputActive: boolean = false;
  @Input() itemList: itemListInterface = {
    item: '',
    type: 1,
  };
  @Input() itemIndex: number = 0;
  @Input() options: optionInterface[] = [];

  @Output() changeTypeEvent = new EventEmitter<any>();
  constructor(private _befService: BefService) {}

  ngOnInit(): void {}

  checkForClass(property: string, thing: string) {
    let type: string = '';
    if (thing === 'item') {
      type = this.options[this.itemList.type].color;
    } else if (thing.includes('type')) {
      type = this.options[Number.parseInt(thing.split('_')[1])].color;
    }
    let bgType = { 'bef-PROPERTY-TYPE__OPA__0_33': true };
    bgType = JSON.parse(
      JSON.stringify(bgType).replace('PROPERTY', property).replace('TYPE', type)
    );
    return bgType;
  }

  changeInfo(thing: string | number, option: string) {
    let type = this.itemList.type;
    let item = this.itemList.item;
    if (option === 'type' && typeof thing === 'number') {
      type = thing;
    } else if (option === 'item' && typeof thing === 'string') {
      item = thing;
    }
    this.changeTypeEvent.emit({
      i: this.itemIndex,
      item: { item: item, type: type },
    });
  }

  inputActiveChange() {
    this.inputActive = !this.inputActive;
  }

  cssCreate() {
    this._befService.cssCreate();
  }
}
