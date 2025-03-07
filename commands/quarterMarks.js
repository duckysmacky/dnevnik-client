import Dnevnik from "dnevnik-mos-ru-api";

export async function quarterMarks() {
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

    await client.getPerPeriodMarks().then(e => {
        for (let subjectMark of e) {
            console.log(subjectMark.subject_name + ": " + subjectMark.periods.map(e => e.avg_five).join(" | "));
        }
    }).catch(e => console.log(e));
}
