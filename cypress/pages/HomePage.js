import PostFeed from "../../page_elements/PostFeed.js";
import BasePage from "./BasePage.js";

export default class HomePage extends BasePage {

    constructor() {
        super();
        this.postFeed = new PostFeed();
    }
    likePostByTitle(title) {
        this.postFeed.likePostByTitle(title);
    }
    likeByTitleAndVerify(title) {
        this.postFeed.likeAndVerifyCountIncrement(title);
    }
    removeLikeByTitleAndVerify(title) {
        this.postFeed.removeLikeAndVerifyCountDecrement(title)
    }
    clickGlobalFeedTab() {
        this.postFeed.clickGlobalFeedTab();
    }

    visit() {
        return super.visit('');
    }
}