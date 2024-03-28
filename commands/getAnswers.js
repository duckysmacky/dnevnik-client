const Dnevnik = require("dnevnik-mos-ru-api");

module.exports = async function getAnswers(id) {
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

    await Dnevnik.Client.getMeshAnswers(id).then(e => {
        for (let question of e) {
            console.log(question.question + " " + JSON.stringify(question.answer));
        }
    }).catch(e => console.log(e))
}