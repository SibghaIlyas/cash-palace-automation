
import { expect, type Page } from "@playwright/test";

export class TransferPage {
  constructor(private page: Page) {}

  async transferMoney(recipient: string, amount: number) {
    await this.page.getByLabel("Recipient Name").fill(recipient);
    await this.page.getByLabel("Amount ($)").fill(String(amount));
    await this.page.getByRole("button", { name: "Send Transfer" }).click();
    expect(await this.page.locator("li[role='status']").textContent()).toEqual(`Transfer Successful$${amount} sent to ${recipient}`);

  }
}
