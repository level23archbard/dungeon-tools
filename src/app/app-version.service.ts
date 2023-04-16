import { Injectable } from '@angular/core';
import { coerce, SemVer } from 'semver';

import packageJson from '../../package.json';
import { SettingsService } from './settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class AppVersionService {

  readonly version = packageJson.version;

  constructor(private settings: SettingsService) {}

  updateVersion(): void {
    const previousVersion = coerce(this.settings.getCurrentSetting('appVersion')) || new SemVer('0.0.0');
    if (previousVersion.version !== this.version) {
      this.performMigrations(previousVersion);
      this.settings.setSetting('appVersion', this.version);
    }
  }

  private performMigrations(_previousVersion: SemVer): void {
    // If any migrations, handle here. Use semver ltr method to check if previous version is less than a migration target.
  }
}
