import Dnevnik from "dnevnik-mos-ru-api";

export async function auth(login, password, {totp, show, path}) {
    let headless = show
        ? false
        : "new"

    let auth = totp
        ? new Dnevnik.PuppeteerAuthenticator(login, password, {headless: headless, totp: Number(totp)})
        : new Dnevnik.PuppeteerAuthenticator(login, password, {headless: headless});

    console.log("Аутентификация...");
    await auth.init();
    await auth.authenticate();
    await auth.refresh();
    await auth.save(path + "\\auth.json");
    await auth.close();

    console.log("Успешно сгенерирован токен для аутентификации:");
    console.log(path + "\\auth.json");
    process.exit(0);
}
