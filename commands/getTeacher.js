const Dnevnik = require("dnevnik-mos-ru-api");

module.exports = async function getTeacher(id) {
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

    await client.getTeacher(id).then(e => {
        console.log(e.user.first_name + " " + e.user.middle_name);
    }).catch(e => console.log(e))
}