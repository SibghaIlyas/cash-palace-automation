import { expect, type Page } from "@playwright/test";
import { parseMoney } from "../utils/money";

export class DashboardPage {
  constructor(private page: Page) {}

  async balanceValue(): Promise<number> {
    const balanceText = await this.page.getByTestId("balance-amount").innerText();
    return parseMoney(balanceText);
  }

  async recentTransactionsTable() {
    return this.page.getByTestId("transactions-title").textContent();
  }

  async assertTransactionRow(
  page: Page,
  { date, description, amount, status }: { date: string; description: string; amount: string; status: string }
) {
  const row = page
    .locator('[data-testid^="transaction-row-"]')
    .filter({ hasText: date })
    .filter({ hasText: description })
    .filter({ hasText: amount })
    .filter({ hasText: status });

  await expect(row).toBeVisible();
}
}
