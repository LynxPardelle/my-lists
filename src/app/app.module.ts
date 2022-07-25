import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

/* BEFService */
import { NgxBootstrapExpandedFeaturesService as BefService } from 'ngx-bootstrap-expanded-features';

/* Components */
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';

/* Directives */
import { NgInitDirective } from './directives/ng-init.directive';

/* Pipes */
import { SafeHtmlPipe } from './pipes/safe-html';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemComponent,

    /* Directives */
    NgInitDirective,

    /* Pipes */
    SafeHtmlPipe,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [BefService],
  bootstrap: [AppComponent],
})
export class AppModule {}
