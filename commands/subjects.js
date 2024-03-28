const Dnevnik = require("dnevnik-mos-ru-api");

module.exports = async function subjects() {
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

    await client.getSubjects().then(e => {
        for (let subject of e) {
            console.log(subject.name);
        }
    }).catch(e => console.error(e));
}