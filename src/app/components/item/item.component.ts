import { Component, Input, OnInit } from '@angular/core';
import itemListInterface from '../interfaces/itemList';
import { Output, EventEmitter } from '@angular/core';

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
  @Input() itemList!: itemListInterface;
  @Input() itemIndex!: number;

  @Output() changeTypeEvent = new EventEmitter<any>();
  constructor(private _befService: BefService) {}

  ngOnInit(): void {}

  checkForClass(property: string) {
    let type: string = 'success';
    switch (this.itemList.type) {
      case 'checked':
        type = 'success';
        break;
      case 'not-checked':
        type = 'light';
        break;
      case 'option 3':
        type = 'warning';
        break;
      case 'option 4':
        type = 'danger';
        break;
    }
    let bgType = { 'bef-PROPERTY-TYPE__OPA__0_33': true };
    bgType = JSON.parse(
      JSON.stringify(bgType).replace('PROPERTY', property).replace('TYPE', type)
    );
    return bgType;
  }

  changeType(thing: string, option: string) {
    let type = this.itemList.type;
    let item = this.itemList.item;
    if (option === 'type') {
      type = thing;
    } else {
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
