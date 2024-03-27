const Dnevnik = require("dnevnik-mos-ru-api");
const fs  = require("fs");

if (process.argv.length < 4) {
    console.log("Usage: node auth <login> <password> [totp]");
    process.exit(1);
}

// Body
(async () => {
    // Read login data from file
    // var data = fs.readFileSync("login-info.txt").toString().split("\n");
    // const login = data[0];
    // const password = data[1];

    // Read login data from args
    const login = process.argv[2];
    const password = process.argv[3];

    let auth;
    if (process.argv.length == 5) {
        const totp = process.argv[4];
        auth = new Dnevnik.PuppeteerAuthenticator(login, password, {headless: "new", totp: totp});
    } else {
        auth = new Dnevnik.PuppeteerAuthenticator(login, password, {headless: "new"});
    }

    // Auth setup
    console.log("Authenticating...");
    await auth.init();
    await auth.authenticate();
    await auth.refresh();
    await auth.save("auth.json");
    await auth.close();

    console.log("Successfully authenticated!");
    process.exit(0);
})();