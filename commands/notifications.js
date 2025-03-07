import Dnevnik from "dnevnik-mos-ru-api";

export async function notifications(type) {
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

    if (!type) type = "create_homework";

    await client.getNotifications().then(e => {
        for (let notification of e) {
            if (notification.event_type === type) {
                console.log(notification.new_hw_description);
            }
        }
    }).catch(e => console.log(e));
}
