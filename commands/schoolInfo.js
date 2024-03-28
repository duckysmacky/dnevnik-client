const Dnevnik = require("dnevnik-mos-ru-api");

module.exports = async function schoolInfo() {
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
    console.log(schoolInfo);
}