import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SideListingComponent } from "./side-listing.component";

@NgModule({
  declarations: [SideListingComponent],
  imports: [
    CommonModule,
  ],
  exports: [SideListingComponent],
})
export class SideListingModule {}
