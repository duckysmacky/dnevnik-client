import Dnevnik from "dnevnik-mos-ru-api";
import { DateTime } from "luxon";

export async function schedule(days) {
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

    if (!days) days = 1;

    await client.getSchedule(
        DateTime.now().plus({days: days}), 
        DateTime.now().plus({days: days})
    ).then(e => {
        for (let a of e.activities) {
            if(a.type==="LESSON") {
                console.log(a.begin_time + ": " + a.lesson.subject_name);
            }
        }
    }).catch(e => console.error(e));
}
