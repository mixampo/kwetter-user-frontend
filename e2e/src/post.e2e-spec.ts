import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';

describe('Post tests - ', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();

    // Login first because of AuthGuards blocking unauthorized access
    page.navigateTo('login');
    element(by.name('email')).sendKeys('maxim@test.com');
    element(by.name('password')).sendKeys('TestPassword1!@');

    element(by.id('loginBtn')).click();
  });

  it('Should edit an user created post', () => {
    // Click the edit button on an existing post
    element(by.tagName('app-post')).element(by.id('editPostBtn')).click().then(function() {
      // Wait for the modal to be shown
      browser.wait(element(by.id('editPostModal')).isDisplayed, 5000);
    }).then(function() {
      // Edit post content
      element(by.id('editPostModal')).element(element(by.name('editPostContent')).sendKeys(' This post has been edited by an Angular E2E test'));
    }).then(function() {
      // Save changes
      element(by.id('editPostModal')).element(element(by.id('saveEditPostChangesBtn')).click());
    });

    //Browser should show alert saying 'Update succesfull'
    expect<any>(element(by.tagName('app-alert')).isDisplayed()).toBe(true);
    expect(element(by.tagName('app-alert')).getText()).toContain('Update successful');
  });

  it('Should  delete an user created post', () => {
    // Click the delete button on an existing post
    element(by.tagName('app-post')).element(by.id('deletePostBtn')).click().then(function() {
      // Wait for the modal to be shown
      browser.wait(element(by.id('deletePostModal')).isDisplayed, 5000);
    }).then(function() {
      // Confirm the deletion by clicking on 'Yes'
      element(by.id('deletePostModal')).element(element(by.id('deletePostYesConfirmationBtn')).click());
    });

    //Browser should show alert saying 'Delete succesfull'
    expect<any>(element(by.tagName('app-alert')).isDisplayed()).toBe(true);
    expect(element(by.tagName('app-alert')).getText()).toContain('Delete successful');
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
