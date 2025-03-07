import Dnevnik from "dnevnik-mos-ru-api";

export async function menu() {
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

    await client.getMenu().then(e => {
        for (let meal of e) {
            console.log(meal.meals.map(e => e.name).join(", "));
        }
    }).catch(e => console.log(e));
}
