import { Component, OnInit } from '@angular/core';

/* Interfaces */
import itemListInterface from '../interfaces/itemList';
import optionInterface from '../interfaces/option';

/* BEFService */
import { NgxBootstrapExpandedFeaturesService as BefService } from 'ngx-bootstrap-expanded-features';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [BefService],
})
export class ListComponent implements OnInit {
  public list: itemListInterface[] = [
    {
      item: 'alumno 1',
      type: 0,
    },
    {
      item: 'alumno 2',
      type: 1,
    },
    {
      item: 'alumno 3',
      type: 1,
    },
    {
      item: 'alumno 4',
      type: 1,
    },
  ];
  public options: optionInterface[] = [
    {
      option: 'checked',
      color: 'success',
    },
    {
      option: 'not-checked',
      color: 'secondary',
    },
    /* {
      option: 'option 3',
      color: 'warning',
    },
    {
      option: 'option 4',
      color: 'danger',
    }, */
  ];

  public basicColors: string[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
    'indigo',
    'purple',
    'pink',
    'orange',
    'teal',
    'white',
    'gray',
    'mystic',
    'lavender',
    'fairy',
    'summer',
    'old',
    'friend',
    'tree',
    'blood',
    'beast',
    'abyss',
  ];

  public newItem: itemListInterface = {
    item: '',
    type: 1,
  };

  constructor(private _befService: BefService) {
    this._befService.cssCreate();
  }

  ngOnInit(): void {}

  checkForClass(property: string, thing: string) {
    let type: string = '';
    if (thing === 'item') {
      type = this.options[this.newItem.type].color;
    } else if (thing.includes('type')) {
      type = this.options[Number.parseInt(thing.split('_')[1])].color;
    }

    let bgType = { 'bef-PROPERTY-TYPE__OPA__0_33': true };
    bgType = JSON.parse(
      JSON.stringify(bgType).replace('PROPERTY', property).replace('TYPE', type)
    );
    this.cssCreate();
    return bgType;
  }

  changeInfo(thing: string | number, option: string) {
    if (option === 'type' && typeof thing === 'number') {
      this.newItem.type = thing;
    } else if (option === 'item' && typeof thing === 'string') {
      this.newItem.item = thing;
    }
  }

  cssCreate() {
    this._befService.cssCreate();
  }

  changeInfoO(change: any) {
    if (change.item.item) {
      if (change.item.item !== '' && change.item.item !== '\n') {
        this.list[change.i] = change.item;
      } else {
        this.list.splice(change.i, 1);
      }
    } else if (change.item.option) {
      if (change.item.option !== '' && change.item.option !== '\n') {
        this.options[change.i] = change.option;
      } else {
        this.options.splice(change.i, 1);
      }
    }
  }

  createNewItem() {
    if (this.newItem.item !== '') {
      this.list.push(this.newItem);
      this.newItem = {
        item: '',
        type: 1,
      };
    }
  }
}
