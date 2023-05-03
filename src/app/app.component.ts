import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _sharedService: SharedService,
    private _befService: NgxBootstrapExpandedFeaturesService
  ) {
    this._befService.changeDebugOption();
    // this._befService.changeUseTimerOption();
    this._befService.setTimeBetweenReCreate(500);
  }

  ngOnInit() {
    this.cssCreate();
  }

  cssCreate() {
    this._sharedService.cssCreate();
  }
}
