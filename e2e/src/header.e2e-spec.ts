import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';

describe('Header tests - ', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();

    // Login first because of AuthGuards blocking unauthorized access
    page.navigateTo('login');
    element(by.name('email')).sendKeys('maxim@test.com');
    element(by.name('password')).sendKeys('TestPassword1!@');

    element(by.id('loginBtn')).click();
  });

  it('Should redirect the user to the profile page after clicking on the `Profile` option', () => {
    //Click on profile button in header
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('profileLink')).click();

    //Should be on profile page
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}profile`);
  });

  it('Should redirect the user to the homepage after clicking on the `Home` option', () => {
    //Click on home button in header
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('homeLink')).click();

    //Should be on homepage
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}home`);
  });

  it('Should log the user out and delete the userData wihtin the localstorage after clicking on the `Logout` option', () => {
    //Click on logout button in header
    element.all(by.tagName('app-root')).all(by.tagName('app-header')).all(by.id('logoutLink')).click();

    //Should be on loginPage
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}login`);

    //Should show success message
    expect(element(by.id('success')).getText()).toContain('Logout successful');

    //Wait for browser to be ready
    browser.wait(element(by.id('loginBtn')).isPresent());

    //Get localstorage item
    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    //Item should be null
    expect(valLocalStorage).toBeNull();
  });

  afterEach(async () => {
    // save the browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
