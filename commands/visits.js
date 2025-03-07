import Dnevnik from "dnevnik-mos-ru-api";
import { DateTime } from "luxon";

export async function visits(months) {
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

    if (!months) months = 1;
    
    await client.getVisits(
        DateTime.now().minus({months: months})
    ).then(e => {
        for (let visitDay of e) {
            console.log(visitDay.date.toFormat("dd.MM.yyyy"));
            for (let visit of visitDay.visits) {
                console.log("- "+visit.in.toFormat("HH:mm"));
            }
        }
    }).catch(e => console.log(e));
}
