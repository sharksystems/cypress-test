import PostFeed from "../../page_elements/PostFeed.js";
import BasePage from "./BasePage.js";

export default class ProfilePage extends BasePage {
    constructor() {
        super();
        this.postFeed = new PostFeed();
    }

    clickEditProfileBtn() {
        cy.xpath("//a[contains(.,'Edit Profile Settings')]").click();
    }
    clickFavoritedArticlesTab() {
        this.postFeed.clickFavoritedArticlesTab();
    }
    clickMyArticlesTab() {
        this.postFeed.clickMyArticlesTab();
    }
    assertNoPostsDisplayed() {
        this.postFeed.assertNoPostsDisplayed();
    }
    clickPostByTitle(title) {
        this.postFeed.clickPostByTitle(title);
    }
    removeLikeFromPostByTitleAndVerify(title) {
        this.postFeed.removeLikeAndVerifyCountDecrement(title);
    }
}