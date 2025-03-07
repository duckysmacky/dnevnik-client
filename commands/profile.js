import Dnevnik from "dnevnik-mos-ru-api";

// TODO - make output somehow readable
export async function profile() {
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

    await client.getProfile({
        with_groups: true,
        with_ae_attendances: true,
        with_attendances: true,
        with_ec_attendances: true,
        with_assignments: true,
        with_parents: true,
        with_subjects: true,
        with_marks: true,
        with_final_marks: true,
        with_home_based_periods: true,
        with_lesson_info: true,
        with_lesson_comments: true
    }).then(e => {
        for (let mark of e.marks) {
            console.log(mark.name + " " + mark.subject_id);
        }
    }).catch(e => console.log(e));
}
