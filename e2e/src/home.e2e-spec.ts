import {browser, by, element, logging} from 'protractor';
import {AppPage} from './app.po';

describe('Homepage tests - ', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();

    // Login first because of AuthGuards blocking unauthorized access
    page.navigateTo('login');
    element(by.name('email')).sendKeys('maxim@test.com');
    element(by.name('password')).sendKeys('TestPassword1!@');

    element(by.id('loginBtn')).click();
  });

  it('Should add a new user created post', () => {
    //Fill in content for the new post
    element(by.name('content')).sendKeys('Hello this is a new post which has been created by an Angular E2E test');

    //Click post button
    element(by.id('postBtn')).click();

    //Browser should display message on home page after successfully adding a new post
    expect(element(by.tagName('app-alert')).getText()).toContain('Post created succesfully');

    //Fields for adding worktime registration should be emptied
    expect<any>(element(by.name('content')).getAttribute('value')).toBe('');
  });

  it('should fetch all the existing posts as seperate blocks in a complete overview', () => {
    //Get the amount of posts from the page
    let posts = element.all(by.id('post-entries')).all(by.tagName('app-post'));

    //The amount of posts should be greater than 0
    expect(posts.count()).toBeGreaterThan(0);
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
