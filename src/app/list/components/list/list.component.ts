import { Component, OnInit } from '@angular/core';

/* Interfaces */
import itemListInterface from '../../interfaces/itemList';
import optionInterface from '../../interfaces/option';

/* Services */
import { SharedService } from 'src/app/shared/services/shared.service';
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
      item: 'item 1',
      type: 0,
    },
  ];
  public options: optionInterface[] = [
    {
      option: 'category 1',
      color: 'success',
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
    type: 0,
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

  constructor(
    private _befService: BefService,
    private _sharedService: SharedService
  ) {
    this._befService.cssCreate();
  }

  ngOnInit(): void {
    this.getList();
    this.cssCreate();
    let _befColors: { [key: string]: string } = this._befService.getColors();
    this.basicColors = Object.keys(_befColors);
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
    switch (true) {
      case option === 'type':
        if (typeof thing === 'number') {
          this.newItem.type = thing;
        }
        break;
      case ['item', 'color'].includes(option):
        if (typeof thing === 'string') {
          this.newOption.color = thing;
        }
        break;
    }
  }

  cssCreate() {
    this._sharedService.cssCreate();
  }

  changeInfoO(change: any) {
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
        type: 0,
      };
      this.saveList();
    }
  }

  createNewOption() {
    if (this.newOption.option !== '' && this.newOption.color !== '') {
      this.options.push(this.newOption);
      this.newOption = {
        option: '',
        color: '',
      };
      this.saveList();
    }
    this.cssCreate();
  }

  saveList() {
    let myLists = {
      list: this.list,
      options: this.options,
    };
    localStorage.setItem('MyLists', JSON.stringify(myLists));
    this.savedLists = JSON.stringify(myLists);
  }

  getList() {
    let myLists: any = localStorage.getItem('MyLists');
    if (myLists !== null) {
      myLists = JSON.parse(myLists);
      if (myLists !== undefined) {
        this.list = myLists.list;
        this.options = myLists.options;
        this.savedLists = JSON.stringify(myLists);
      }
    }
    this.cssCreate();
  }

  restoreLists() {
    let myLists: any = this.saveLists.saveList;
    if (myLists !== '') {
      try {
        myLists = JSON.parse(myLists);
        console.log(myLists.list);
        console.log(myLists.options);
        this.errorMessage = '';
        if (myLists === undefined) throw new Error('There is no lists.');
        if (
          myLists.list &&
          myLists.list.every(
            (list: itemListInterface) =>
              !!list.item &&
              typeof list.item === 'string' &&
              typeof list.type !== 'undefined' &&
              typeof list.type === 'number'
          )
        ) {
          this.list = myLists.list;
        } else {
          this.errorMessage +=
            'Error in the list, data corrupted, check the information in the input.';
        }
        if (
          myLists.options &&
          myLists.options.every(
            (option: optionInterface) =>
              !!option.option &&
              typeof option.option === 'string' &&
              !!option.color &&
              typeof option.color === 'string'
          )
        ) {
          this.options = myLists.options;
        } else {
          this.errorMessage +=
            'Error in the options, data corrupted, check the information in the input.';
        }
        this.savedLists = JSON.stringify(myLists);
        this.saveList();
        this.errorMessage =
          'Data retrieved successfully.' +
          (this.errorMessage !== ''
            ? 'Except for the next errors:' + this.errorMessage
            : '');
      } catch (error) {
        console.error(error);
        this.errorMessage =
          'No se ha podido importar la lista, revisa los datos porfavor.';
      }
    }
    this.cssCreate();
  }

  getHTML(type: string, size: string = '16'): string {
    return this._sharedService.getHTML(type, size);
  }
}
