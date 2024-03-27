const Dnevnik = require("dnevnik-mos-ru-api");

if (process.argv.length < 3) {
    console.log("Usage: node client <function>");
    process.exit(1);
}
const arg = process.argv[2];

// Body
(async () => {
    // Auth
    let auth = new Dnevnik.FileAuthenticator("auth.json");
    await auth.init();
    await auth.authenticate();
    let client = new Dnevnik.Client(auth);

    async function schoolInfo() {
        console.log(await client.getSchoolInfo());
    }

    switch (arg) {
        case "help":
            console.log("HELP:\nschoolInfo\t");
            break;
        case "schoolInfo":
            await schoolInfo();
            break;
        default:
            break;
    }

    await auth.close();
    process.exit(0);
})();