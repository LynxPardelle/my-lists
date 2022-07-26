import { Component, OnInit } from '@angular/core';
import itemListInterface from '../interfaces/itemList';

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
      type: 'checked',
    },
    {
      item: 'alumno 2',
      type: 'not-checked',
    },
    {
      item: 'alumno 3',
      type: 'option 3',
    },
    {
      item: 'alumno 4',
      type: 'checked',
    },
  ];
  public options: string[] = [];

  constructor(private _befService: BefService) {
    this._befService.cssCreate();
  }

  ngOnInit(): void {}


  cssCreate() {
    this._befService.cssCreate();
  }

  changeTypeO(change: any) {
    console.log(change);
    this.list[change.i] = change.item;
  }
}
