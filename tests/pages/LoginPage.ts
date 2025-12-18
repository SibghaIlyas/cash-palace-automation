import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto(baseUrl: string) {
    await this.page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole("button", { name: /Sign In/ }).click();

    // Assert we are in the app
    await expect(this.page.getByRole("heading", { name: /FinTech Dashboard/ })).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByTestId("welcome-message")).toContainText(`Welcome back, ${username}`)
  }
}
