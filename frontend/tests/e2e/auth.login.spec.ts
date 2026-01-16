import test, { expect } from "@playwright/test";

const TEST_USER = {
    username: 'testuser_e2e',
    password: 'Test@12345'
};

test("Login user successfully", async ({ page }) => {

    page.on("response", async (res) => {
        if (res.url().includes("/login")) {
            console.log("login STATUS:", res.status())
            console.log("login RESPONSE:", await res.text())
        }
    })

    //Go to login
    await page.goto("/login");

    //fill login form
    await page.locator('input[placeholder="Username or Email"]:visible').fill(TEST_USER.username);
    await page.locator('input[placeholder="Password"]:visible').fill(TEST_USER.password);

    //click login button
    await page.getByRole("button", { name: /Log In/i }).click();

    await expect(page).toHaveURL(/\/login/);
})