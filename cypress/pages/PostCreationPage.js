import BasePage from "./BasePage.js";

export default class PostCreationPage extends BasePage {

    enterPostTitle(title) {
        cy.get("input[name='articleTitle']").type(title);
    }
    enterPostSummary(summary) {
        cy.get("input[name='description']").type(summary);
    }
    enterPostContent(content) {
        cy.get("textarea[name='body']").type(content);
    }
    clickPostSubmitBtn() {
        cy.get("button.btn-lg").click();
        cy.wait(1000);
    }
}