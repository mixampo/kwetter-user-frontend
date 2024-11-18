import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';

describe('Profile tests - ', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();

    // Login first because of AuthGuards blocking unauthorized access
    page.navigateTo('login');
    element(by.name('email')).sendKeys('maxim@test.com');
    element(by.name('password')).sendKeys('TestPassword1!@');

    element(by.id('loginBtn')).click();

    //Wait until the async login function has been completed
    browser.wait(element(by.id('postBtn')).isPresent());

    //Navigate to the profile page
    page.navigateTo('profile');
  });

  it('Should save the edited user profile and log the user out', () => {
    // Click the edit profile button
    element(by.id('editProfileBtn')).click().then(function() {
      // Wait for the modal to be shown
      browser.wait(element(by.id('editProfileModal')).isDisplayed, 5000);
    }).then(function() {
      // Edit profile
      element(by.id('editProfileModal')).element(element(by.name('editFirstname')).sendKeys(' Angular'));
      element(by.id('editProfileModal')).element(element(by.name('editLastname')).sendKeys(' E2E'));
    }).then(function() {
      // Save changes
      element(by.id('editProfileModal')).element(element(by.id('saveEditProfileChangesBtn')).click());
    });

    //Browser should redirect user to login page after saving profile changes
    expect(browser.getCurrentUrl()).toContain(`${browser.baseUrl}login?updated=true`);

    //Browser should log out user, so localstorage should not contain userData anymore
    let valLocalStorage = browser.executeScript('return window.localStorage.getItem(\'userData\');');

    expect(valLocalStorage).toBeNull();

    //Browser should show message saying 'Profile updated re-login required'
    expect<any>(element(by.id('success')).isDisplayed()).toBe(true);
    expect(element(by.id('success')).getText()).toContain('Profile updated re-login required');
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
