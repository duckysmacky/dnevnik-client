import Dnevnik from "dnevnik-mos-ru-api";
import { DateTime } from "luxon";

export default async function balance(from, to) {
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

    await client.getBilling(
        DateTime.now(), 
        DateTime.now()
    ).then(e => {
        console.log(e.balance / 100)
    }).catch(e => console.log(e));
}
