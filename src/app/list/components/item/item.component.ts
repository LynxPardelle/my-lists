import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

/* Interfaces */
import itemListInterface from '../../interfaces/itemList';
import optionInterface from '../../interfaces/option';

/* NGX-Bootstrap */
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

/* Services */
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class ItemComponent implements OnInit {
  public inputActive: boolean = false;
  @Input() itemList!: itemListInterface | optionInterface;
  @Input() itemIndex: number = 0;
  @Input() options: optionInterface[] | string[] = [];

  @Output() changeTypeEvent = new EventEmitter<any>();
  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    this.cssCreate();
  }

  checkIfItemListInterface(
    itemList: itemListInterface | optionInterface
  ): itemList is itemListInterface {
    return (<itemListInterface>itemList).item !== undefined;
  }

  checkIfOptionInterface(
    option: optionInterface[] | string[]
  ): option is optionInterface[] {
    return (<optionInterface[]>option)[0].option !== undefined;
  }

  getColorIndex(color: string) {
    return !this.checkIfOptionInterface(this.options)
      ? this.options.indexOf(color)
      : -1;
  }

  checkForClass(property: string, thing: string) {
    let type: string = '';
    if (
      this.checkIfItemListInterface(this.itemList) &&
      this.checkIfOptionInterface(this.options)
    ) {
      if (thing === 'item') {
        if (this.itemList.type >= 0 && !!this.options[this.itemList.type]) {
          type = this.options[this.itemList.type].color;
        } else {
          type = 'dark';
        }
      } else if (thing.includes('type')) {
        type = this.options[Number.parseInt(thing.split('_')[1])].color;
      }
    } else if (
      !this.checkIfItemListInterface(this.itemList) &&
      !this.checkIfOptionInterface(this.options)
    ) {
      if (thing === 'option') {
        type = this.itemList.color;
      } else if (thing.includes('color')) {
        type = this.options[Number.parseInt(thing.split('_')[1])];
      }
    }
    let bgType = { 'bef-PROPERTY-TYPE__OPA__0_33': true };
    bgType = JSON.parse(
      JSON.stringify(bgType).replace('PROPERTY', property).replace('TYPE', type)
    );
    this.cssCreate();
    return bgType;
  }

  changeInfo(thing: string | number, choice: string) {
    thing = typeof thing === 'string' ? this.checkIfHas(thing) : thing;
    if (
      this.checkIfItemListInterface(this.itemList) &&
      this.checkIfOptionInterface(this.options)
    ) {
      let type;
      let item;
      type = this.itemList.type;
      item = this.itemList.item;
      if (choice === 'type' && typeof thing === 'number') {
        type = thing;
      } else if (choice === 'item' && typeof thing === 'string') {
        item = thing;
      }
      this.changeTypeEvent.emit({
        i: this.itemIndex,
        item: { item: item, type: type },
      });
    } else if (
      !this.checkIfItemListInterface(this.itemList) &&
      !this.checkIfOptionInterface(this.options)
    ) {
      let color;
      let option;
      color = this.itemList.color;
      option = this.itemList.option;
      if (choice === 'color' && typeof thing === 'string') {
        color = thing;
      } else if (choice === 'option' && typeof thing === 'string') {
        option = thing;
      }
      this.changeTypeEvent.emit({
        i: this.itemIndex,
        option: { option: option, color: color },
      });
    }
    this.cssCreate();
  }

  checkIfHas(thing: string, checker: string = '\n', side: string = 'end') {
    let thingToCheck = '';
    if (side === 'end') {
      for (let i = 1; i <= checker.length; i++) {
        thingToCheck = thing[thing.length - i] + thingToCheck;
      }
      if (thingToCheck === checker) {
        thing = thing.slice(0, thing.length - checker.length);
      }
    } else if (side === 'start') {
      for (let i = 0; i <= checker.length; i++) {
        thingToCheck = thingToCheck + thing[i];
      }
      if (thingToCheck === checker) {
        thing = thing.slice(checker.length, thing.length);
      }
    }
    return thing;
  }

  changeSomething(
    thing: string,
    changer: string = '\n',
    toChange: string = '<br />'
  ) {
    thing = thing.replace(/\n/g, '<br />');
    this.cssCreate();
    return thing;
  }

  inputActiveChange() {
    this.inputActive = !this.inputActive;
  }

  getHTML(type: string, size: string = '16'): string {
    return this._sharedService.getHTML(type, size);
  }

  cssCreate() {
    this._sharedService.cssCreate();
  }
}
