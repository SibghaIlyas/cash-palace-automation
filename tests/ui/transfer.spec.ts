import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboadPage";
import { TransferPage } from "../pages/TransferPage";
import { attachTransferRequestLogger } from "../utils/api-discovery";

test.beforeEach('Setup and Login', async ({page}) => {
    const baseUrl = process.env.BASE_URL!;
    const username = process.env.USERNAME ?? `user-${Date.now()}`;
    const password = process.env.PASSWORD ?? "password123";
    
    const login = new LoginPage(page);
    await login.goto(baseUrl);
    await login.login(username, password);
})

test("Transfer creates transaction and updates balance", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const transferPage = new TransferPage(page);
  attachTransferRequestLogger(page);
  const balanceBefore = await dashboardPage.balanceValue();
  console.log(balanceBefore);

  const recipient = "Sibgha";
  const amount = 50.45

  await transferPage.transferMoney(recipient, amount);

  const balanceAfter = await dashboardPage.balanceValue();
  console.log(balanceAfter);

  expect(balanceAfter).toEqual(balanceBefore - amount);

  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const table = await dashboardPage.recentTransactionsTable();
  expect(table).toContain("Recent Transactions");

  // Assert new row appears in Recent Transactions 
  await dashboardPage.assertTransactionRow(page, {date: todayDate, description: `Transfer to ${recipient}`, amount: `-$${amount.toFixed(2)}`, status: "pending" });
});
