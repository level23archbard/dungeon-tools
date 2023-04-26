import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
  ],
  exports: [
    MatIconModule,
  ],
})
export class IconsModule {
  // Steps to create icons
  // 1. Go to https://editor.method.ac/ and create the icon
  // 2. Save the icon to the assets folder
  // 3. Fix the icon's colors to refer to "currentColor" and fix the svg viewport
  // 4. Add another entry below
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.addIcon('add');
    this.addIcon('back');
    this.addIcon('check');
    this.addIcon('close');
    this.addIcon('collapse');
    this.addIcon('delete');
    this.addIcon('exit');
    this.addIcon('expand');
    this.addIcon('forward');
    this.addIcon('handle');
    this.addIcon('quill');
    this.addIcon('question');
    this.addIcon('spellbook');
  }

  private addIcon(iconName: string) {
    this.iconRegistry.addSvgIcon(iconName, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${iconName}.svg`));
  }
}
