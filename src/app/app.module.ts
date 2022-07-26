import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

/* BefService */
import { NgxBootstrapExpandedFeaturesService as BefService } from 'ngx-bootstrap-expanded-features';

/* NGX-Bootstrap */
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [BefService],
  bootstrap: [AppComponent],
})
export class AppModule {}
