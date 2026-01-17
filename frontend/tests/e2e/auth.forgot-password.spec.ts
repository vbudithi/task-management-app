import test, { expect } from "@playwright/test";

test("user request a password reset", async ({ page }) => {

    page.on("response", async (res) => {
        if (res.url().includes("/forgot-password")) {
            console.log("forgot-password STATUS:", res.status())
            console.log("forgot-password RESPONSE:", await res.text())
        }
    })

    // Navigate to login page
    await page.goto('/login');

    //click forgot-password
    await page.getByRole('link', { name: /Forgot Password/i }).click();

    // Confirm navigation to forgot-password page
    await expect(page).toHaveURL(/\/forgot-password/);

    //fill email
    await page.getByRole('textbox', { name: 'Enter your Email' });

    //submit
    await page.getByRole('button', { name: /Send Reset Link/i }).click();

})