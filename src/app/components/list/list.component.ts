import { Component, OnInit } from '@angular/core';

/* Interfaces */
import itemListInterface from '../interfaces/itemList';
import optionInterface from '../interfaces/option';

/* BEFService */
import { NgxBootstrapExpandedFeaturesService as BefService } from 'ngx-bootstrap-expanded-features';
import { throwError } from 'rxjs';
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
    {
      option: 'almost checked',
      color: 'warning',
    },
    {
      option: 'dont check',
      color: 'danger',
    },
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

  public newOption: optionInterface = {
    option: '',
    color: '',
  };

  public savedLists: string = '';

  public saveLists: { saveList: string } = {
    saveList: '',
  };

  public errorMessage: string = '';

  constructor(private _befService: BefService) {
    this._befService.cssCreate();
  }

  ngOnInit(): void {
    this.getList();
  }

  getColorIndex(color: string) {
    return this.basicColors.indexOf(color);
  }

  checkForClass(property: string, thing: string, option: string = 'item') {
    let type: string = '';
    if (option === 'item') {
      if (thing === 'item') {
        type = this.options[this.newItem.type].color;
      } else if (thing.includes('type')) {
        type = this.options[Number.parseInt(thing.split('_')[1])].color;
      }
    } else {
      if (thing === 'option') {
        if (this.newOption.color !== '') {
          type = this.newOption.color;
        } else {
          type = 'dark';
        }
      } else if (thing.includes('color')) {
        type = this.basicColors[this.getColorIndex(thing.split('_')[1])];
      }
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
    } else if (option === 'color' && typeof thing === 'string') {
      this.newOption.color = thing;
    }
  }

  cssCreate() {
    this._befService.cssCreate();
  }

  changeInfoO(change: any) {
    console.log(change);
    if (change.item) {
      if (change.item.item !== '' && change.item.item !== '\n') {
        this.list[change.i] = change.item;
      } else {
        this.list.splice(change.i, 1);
      }
    } else if (change.option) {
      if (change.option.option !== '' && change.option.option !== '\n') {
        this.options[change.i] = change.option;
      } else {
        for (let itemList of this.list) {
          if (itemList.type === change.i) {
            itemList.type = -1;
          }
        }
        this.options.splice(change.i, 1);
      }
    }
    this.saveList();
  }

  createNewItem() {
    if (this.newItem.item !== '') {
      this.list.push(this.newItem);
      this.newItem = {
        item: '',
        type: 1,
      };
      this.saveList();
    }
  }

  createNewOption() {
    if (this.newOption.option !== '') {
      this.options.push(this.newOption);
      this.newOption = {
        option: '',
        color: '',
      };
      this.saveList();
    }
  }

  saveList() {
    let myLists = {
      list: this.list,
      options: this.options,
      basicColors: this.basicColors,
    };
    localStorage.setItem('MyLists', JSON.stringify(myLists));
  }

  getList() {
    let myLists: any = localStorage.getItem('MyLists');
    if (myLists !== null) {
      myLists = JSON.parse(myLists);
      if (myLists !== undefined) {
        this.list = myLists.list;
        this.options = myLists.options;
        this.basicColors = myLists.basicColors;
        this.savedLists = JSON.stringify(myLists);
      }
    }
  }

  restoreLists() {
    let myLists: any = this.saveLists.saveList;
    if (myLists !== '') {
      try {
        myLists = JSON.parse(myLists);
        console.log(myLists.list);
        console.log(myLists.options);
        console.log(myLists.basicColors);
        if (
          myLists !== undefined &&
          myLists.list &&
          myLists.list[0] &&
          myLists.list[0].item &&
          typeof myLists.list[0].item === 'string' &&
          myLists.list[0].type &&
          typeof myLists.list[0].type === 'number' &&
          myLists.options &&
          myLists.options[0] &&
          myLists.options[0].option &&
          typeof myLists.options[0].option === 'string' &&
          myLists.options[0].color &&
          typeof myLists.options[0].color === 'string' &&
          myLists.basicColors &&
          myLists.basicColors[0]
        ) {
          this.list = myLists.list;
          this.options = myLists.options;
          this.basicColors = myLists.basicColors;
          this.savedLists = JSON.stringify(myLists);
          this.saveList();
          this.errorMessage = 'Data retrieved successfully';
        } else {
          throw new Error('Error de JSON parse');
        }
      } catch (error) {
        console.log(error);
        this.errorMessage =
          'No se ha podido importar la lista, revisa los datos porfavor.';
      }
    }
  }
}
