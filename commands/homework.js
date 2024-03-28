const Dnevnik = require("dnevnik-mos-ru-api");
const {DateTime, Interval} = require("luxon");

module.exports = async function homework(from, to) {
    let auth;
    try {
        auth = new Dnevnik.FileAuthenticator("auth.json");
    } catch (error) {
        console.log("Ошибка! Сначала необходимо сгенерировать токен для авторизации: dvnk auth");
        process.exit(1);
    }
    await auth.init();
    await auth.authenticate();
    let client = new Dnevnik.Client(auth);

    if (!from) from = 1;
    if (!to) to = from;

    await client.getHomework(
        DateTime.now().plus({days: from}), 
        DateTime.now().plus({days: to})
    ).then(e => {
        for (let subject of e) {
            console.log(subject.homework_entry.homework.subject.name + ": " + subject.homework_entry.description);
        }
    }).catch(e => console.error(e));
}