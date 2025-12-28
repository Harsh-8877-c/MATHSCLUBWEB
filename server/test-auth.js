// Use native fetch (Node 18+)
(async () => {
    try {
        console.log("1. Registering Admin...");
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: 'Test Admin',
                email: 'admin@test.com',
                password: 'password123',
                role: 'Admin'
            })
        });
        const regData = await regRes.json();
        console.log("Register Response:", regRes.status, regData);

        console.log("\n2. Logging in as Admin...");
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@test.com',
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();
        console.log("Login Response:", loginRes.status, loginData);
        if (loginRes.status === 200 && loginData.token) {
            console.log("\nSUCCESS: Admin login working!");
        } else {
            console.log("\nFAILURE: Admin login failed.");
        }

    } catch (e) { console.error(e); }
})();
