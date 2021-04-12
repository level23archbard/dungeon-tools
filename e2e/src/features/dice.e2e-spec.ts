import { browser, logging, until } from 'protractor';
import { AppPage } from '../pages/app.po';

describe('Dice Feature', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should toggle dice tool', async () => {
    await page.navigateTo();
    expect(await page.getDiceToolTitle().isPresent()).toBeFalsy();
    await page.clickDiceButton();
    await browser.sleep(250);
    expect(await page.getDiceToolTitle().getText()).toEqual('DICE');
    await page.clickSideMenuCloseButton();
    await browser.sleep(250);
    expect(await page.getDiceToolTitle().isPresent()).toBeFalsy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
