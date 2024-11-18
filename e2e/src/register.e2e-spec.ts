import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';

describe('Registration tests - ', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo('register');
  });

  it('Should not register a new user because the e-mail already exists', () => {
    // Personal information
    element(by.name('firstname')).sendKeys('M.');
    element(by.name('lastname')).sendKeys('Test');
    element(by.name('dateOfBirth')).sendKeys('11/02/1992');
    element(by.name('country')).sendKeys('The Netherlands');

    // Account information
    element(by.name('email')).sendKeys('maxim@test.com');
    element(by.name('gender')).sendKeys('Male');
    element(by.name('phoneNumber')).sendKeys('0632047896');
    element(by.name('password')).sendKeys('TestPassword1!@');

    // Click on register button
    element(by.id('registerBtn')).click();

    // Browser should stay on register page after registration error
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}register`);

    // Browser should display registration error message
    expect(element(by.id('registrationFailure')).getText()).toContain('User with specified e-mail address already exists, please use a differen e-mail address');
  });

  it('Should redirect to the log in page', () => {
    element(by.id('switchToLogin')).click();

    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}login`);
  });

  it('Should register a new user', () => {

    // Personal information
    element(by.name('firstname')).sendKeys('M.');
    element(by.name('lastname')).sendKeys('Test');
    element(by.name('dateOfBirth')).sendKeys('11/02/1992');
    element(by.name('country')).sendKeys('The Netherlands');

    // Account information
    element(by.name('email')).sendKeys('maxim2@test.com');
    element(by.name('gender')).sendKeys('Male');
    element(by.name('phoneNumber')).sendKeys('0632047896');
    element(by.name('password')).sendKeys('TestPassword1!@');

    // Click on register button
    element(by.id('registerBtn')).click();

    // Browser should redirect to login page after successful registration
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}login`);

    // Browser should display registration success message
    expect(element(by.id('success')).getText()).toContain('Registration successful');
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

