import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* NGX-Bootstrap */
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

/* NGX-Bootstrap-Expanded-Features */
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';

@NgModule({
  declarations: [],
  imports: [CommonModule, TooltipModule.forRoot(), BsDropdownModule.forRoot()],
  providers: [NgxBootstrapExpandedFeaturesService],
  exports: [TooltipModule, BsDropdownModule],
})
export class BootstrapModule {}
