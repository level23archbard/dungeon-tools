import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { IconsModule } from 'src/icons/icons.module';
import { InscriptionEditorComponent } from './inscription-editor/inscription-editor.component';
import { InscriptionViewerComponent } from './inscription-viewer/inscription-viewer.component';

@NgModule({
  declarations: [InscriptionEditorComponent, InscriptionViewerComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
    TextFieldModule,
  ],
  exports: [InscriptionEditorComponent, InscriptionViewerComponent],
})
export class InscriptionModule {}
