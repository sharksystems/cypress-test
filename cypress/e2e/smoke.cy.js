import HomePage from "../pages/HomePage.js";
import LoginPage from "../pages/LoginPage.js";
import ProfileSettingsPage from "../pages/ProfileSettingsPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import RegistrationPage from "../pages/RegistrationPage.js";
import RandomUser from "../resources/RandomUser.js";
import PostCreationPage from "../pages/PostCreationPage.js";
import FullPostPage from "../pages/FullPostPage.js";
import RandomPost from "../resources/RandomPost.js";

describe('Smoke test', () => {
  let homePage;
  let registrationPage;
  let loginPage;
  let profilePage;
  let profileSettingsPage;
  let postCreationPage;
  let fullPostPage;
  const randomUser = new RandomUser();

  beforeEach(() => {
    homePage = new HomePage();
    registrationPage = new RegistrationPage();
    loginPage = new LoginPage();
    profilePage = new ProfilePage();
    profileSettingsPage = new ProfileSettingsPage();
    postCreationPage = new PostCreationPage();
    fullPostPage = new FullPostPage();
    homePage.visit();
  });

  it('Registration test', () => {
    homePage.clickSignUpBtn();
    registrationPage.registerUser(randomUser.getUsername, randomUser.getEmail, randomUser.getPassword);
    homePage.assertLoggedInAs(randomUser.getUsername);
  });
  it('Login test', () => {
    homePage.clickSignInBtn();
    loginPage.login(randomUser.getEmail, randomUser.password);
    homePage.assertLoggedInAs(randomUser.getUsername);
  });
  it('Logout test', () => {
    homePage.clickSignInBtn();
    loginPage.login(randomUser.getEmail, randomUser.password);
    homePage.clickSettingsBtn();
    profileSettingsPage.clickLogoutBtn();
    homePage.assertSignInBtnVisible();
  });
  it('Register as existing user', () => {
    homePage.clickSignUpBtn();
    registrationPage.registerUser(randomUser.getUsername, randomUser.getEmail, randomUser.getPassword);
    registrationPage.assertEmailTakenErrorMsg();
    registrationPage.assertUsernameTakenErrorMsg();
  });
  it('Login using invalid email', () => {
    homePage.clickSignInBtn();
    loginPage.login(randomUser.getUsername, randomUser.password);
    loginPage.assertUsernameOrPasswordErrorMsg();
  });
  it('Liking a post on the main page', () => {
    const postTitle = "Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!"
    const likeUser = new RandomUser();

    homePage.clickSignUpBtn();
    registrationPage.registerUser(likeUser.getUsername, likeUser.getEmail, likeUser.getPassword);
    homePage.clickGlobalFeedTab();
    homePage.likeByTitleAndVerify(postTitle);
  });
  it('Removing a favorited article on the profile page', () => {
    const postTitle = "quantifying the circuit wont do anything, we need to parse the back-end FTP interface!"
    
    homePage.clickSignInBtn();
    loginPage.login(randomUser.getEmail, randomUser.password);
    homePage.clickGlobalFeedTab();
    homePage.likeByTitleAndVerify(postTitle);
    homePage.clickProfileBtn();
    profilePage.clickFavoritedArticlesTab();
    profilePage.removeLikeFromPostByTitleAndVerify(postTitle);
    profilePage.clickMyArticlesTab();
    profilePage.clickFavoritedArticlesTab();
    profilePage.assertNoPostsDisplayed();
  });
  it('Liking a post without logging in', () => {
    const postTitle = "Ill compress the optical SDD hard drive, that should interface the XSS bandwidth!"

    homePage.likePostByTitle(postTitle);
    cy.url().should('eq', 'https://conduit.realworld.how/register');
  });
  it('Creating a post', () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    homePage.clickSignUpBtn();
    registrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    homePage.clickNewPostBtn();
    postCreationPage.enterPostTitle(randomPost.getTitle);
    postCreationPage.enterPostSummary(randomPost.getSummary);
    postCreationPage.enterPostContent(randomPost.getContent);
    postCreationPage.clickPostSubmitBtn();
    fullPostPage.assertPostTitle(randomPost.getTitle);
    fullPostPage.assertPostSummary(randomPost.getSummary);
    fullPostPage.assertPostContent(randomPost.getContent);
  });
  it('Deleting a post from the profile page', () => {
    const randomPost = new RandomPost();

    homePage.clickSignInBtn();
    loginPage.login(randomUser.getEmail, randomUser.password);
    homePage.clickNewPostBtn();
    postCreationPage.enterPostTitle(randomPost.getTitle);
    postCreationPage.enterPostSummary(randomPost.getSummary);
    postCreationPage.enterPostContent(randomPost.getContent);
    postCreationPage.clickPostSubmitBtn();
    homePage.clickProfileBtn();
    profilePage.clickPostByTitle(randomPost.getTitle);
    fullPostPage.clickDeletePostBtn();
    homePage.clickProfileBtn();
    profilePage.assertNoPostsDisplayed();

  });
});