import { test, expect } from "@playwright/test";

test("Register user successfully", async ({ page }) => {
    const unique = Date.now()
    const email = `pw_${unique}@test.com`
    const username = `pw_user_${unique}`

    page.on("response", async (res) => {
        if (res.url().includes("/register")) {
            console.log("REGISTER STATUS:", res.status())
            console.log("REGISTER RESPONSE:", await res.text())
        }
    })

    //Go to register
    await page.goto("/register");

    //fill  form
    await page.locator('input[placeholder="First Name"]:visible').fill("Test");
    await page.locator('input[placeholder="Last Name"]:visible').fill("User");
    await page.locator('input[placeholder="Email"]:visible').fill(email);
    await page.locator('input[placeholder="Username"]:visible').fill(username);
    await page.locator('input[placeholder="Password"]:visible').fill("Test@12345");

    //submit
    await page.getByRole("button", { name: /Sign Up/i }).click();
    await expect(page).toHaveURL(/\/register/);
})