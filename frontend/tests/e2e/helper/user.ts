export function makeTestUser() {
    const id = Date.now();
    return {
        firstName: "Test",
        lastName: "User",
        username: `testuser_${id}`,
        email: `testuser_${id}@test.com`,
        password: "Test@12345",
    };
}