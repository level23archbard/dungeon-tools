import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getHelloWorld(): Promise<string> {
    return element(by.css('lxs-dungeon-tools')).getText();
  }
}
