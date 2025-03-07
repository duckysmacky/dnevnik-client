import Dnevnik from "dnevnik-mos-ru-api";

export default async function progress() {
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

    await client.getProgress().then(e => {
        for (let section of e.sections) {
            for (let subject of section.subjects) {
                console.log(subject.subject_name + " " + subject.passed_hours / subject.total_hours * 100 + "%");
            }
        }
    }).catch(e => console.log(e));
}
