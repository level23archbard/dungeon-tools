import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitle(): Promise<string> {
    return element(by.css('lxs-dungeon-tools header .bar .bar-title')).getText();
  }

  async clickDiceButton(): Promise<void> {
    return element(by.css('lxs-dungeon-tools header .bar .bar-button')).click();
  }

  async clickSideMenuCloseButton(): Promise<void> {
    return element(by.css('lxs-dungeon-tools .side .bar .bar-close')).click();
  }

  getDiceToolTitle(): ElementFinder {
    return element(by.css('lxs-dungeon-tools .side .bar .bar-title'));
  }
}
