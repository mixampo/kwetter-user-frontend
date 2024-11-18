import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';

describe('login tests - ', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('login');
  });

  it('Should not log the user in', () => {
    element(by.name('email')).sendKeys('noUser@test.com');
    element(by.name('password')).sendKeys('12345');

    element(by.id('loginBtn')).click();

    // Browser should reload login page and clear fields
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}login`);

    // Fields should both be emptied automatically after refresh
    expect<any>(element(by.name('email')).getText()).toBe('');
    expect<any>(element(by.name('password')).getText()).toBe('');

    // Browser should show message saying login was not successful
    expect<any>(element(by.id('failure')).isDisplayed()).toBe(true);

    // Message should contain the following text
    expect(element(by.id('failure')).getText()).toContain('Wrong credentials provided, please try again');
  });

  it('Should redirect to the registration page', () => {
    element(by.id('switchToRegister')).click();

    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}register`);
  });


  it('Should log the user in and save the user information in the localstorage', () => {
    element(by.name('email')).sendKeys('maxim@test.com');
    element(by.name('password')).sendKeys('TestPassword1!@');

    element(by.id('loginBtn')).click();

    // Browser should redirect to home page after successful login
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}`);

    browser.wait(element(by.id('postBtn')).isPresent());

    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    expect(valLocalStorage).not.toBeNull();
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
