const Dnevnik = require("dnevnik-mos-ru-api");

module.exports = async function schoolInfo({list, find}) {
    if (list) {
        console.log("id name type principal address phone email website_link classroom_teachers teachers branches");
        process.exit(0);
    }

    let auth;
    try {
        auth = new Dnevnik.FileAuthenticator("auth.json");
    } catch (error) {
        console.log("Ошибка! Сначала необходимо сгенерировать токен для авторизации: dvnk auth");
        console.log(error);
    }
    await auth.init();
    await auth.authenticate();
    let client = new Dnevnik.Client(auth);

    let schoolInfo = await client.getSchoolInfo();
    if (!find) {
        console.log(schoolInfo);
    } else {
        let found = schoolInfo[find];
        if (found != undefined) {
            console.log(schoolInfo[find]);
        } else {
            console.log("Элемент не найден!");
        }
    }
}