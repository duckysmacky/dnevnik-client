import Dnevnik from "dnevnik-mos-ru-api";

export default async function averageMarks() {
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

    await client.getAverageMarks().then(e => {
        e.forEach(m => console.log(m.name + ": " + Math.round(m.mark * 100) / 100));
    }).catch(e => console.error(e));
}
