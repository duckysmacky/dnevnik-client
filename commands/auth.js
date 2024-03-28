const Dnevnik = require("dnevnik-mos-ru-api");

async function auth(login, password, totp) {
    let auth;
    if (totp) {
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
}

module.exports = auth;