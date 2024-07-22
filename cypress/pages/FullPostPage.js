import BasePage from "./BasePage.js";

export default class FullPostPage extends BasePage {
    clickDeletePostBtn() {
        cy.get("button.btn-outline-danger").click();
    }
    assertPostTitle(title) {
        cy.xpath(`//h1[contains(.,'${title}')]`).should('be.visible');
    }
    assertPostSummary(summary) {
        cy.xpath(`//p[contains(.,'${summary}')]`).should('be.visible');
    }
    assertPostContent(content) {
        cy.xpath(`//p[contains(.,'${content}')]`).should('be.visible');
    }
}