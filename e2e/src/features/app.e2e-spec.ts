import { browser, logging } from 'protractor';
import { AppPage } from '../pages/app.po';

describe('Main App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title', async () => {
    await page.navigateTo();
    expect(await page.getTitle()).toEqual('DUNGEON TOOLS');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
