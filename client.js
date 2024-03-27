const Dnevnik = require("dnevnik-mos-ru-api");

if (process.argv.length < 3) {
    console.log("Error! Usage: node client <function>");
    process.exit(1);
}

async function requestSchoolInfo(client) {
    let schoolInfo = await client.getSchoolInfo();
    console.log(schoolInfo);
}

async function requestProfile(client) {
    await client.getProfile({with_groups:true, with_ae_attendances: true, with_attendances: true, with_ec_attendances: true, with_assignments: true, with_parents: true, with_subjects: true, with_marks: true, with_final_marks: true, with_home_based_periods: true, with_lesson_info: true, with_lesson_comments: true}).then(e => {
        for (let mark of e.marks) {
            console.log(mark.name + " " + mark.subject_id);
        }
    }).catch(e => console.log(e));
}

async function requestAverageMarks(client) {
    await client.getAverageMarks().then(e => {
        e.forEach(m => console.log(m.name + " " + m.mark));
    }).catch(e => console.error(e));
}

async function requestMeshAnswers(id) {
    await Dnevnik.Client.getMeshAnswers(id).then(e => {
        for (let question of e) {
            console.log(question.question + " " + JSON.stringify(question.answer));
        }
    }).catch(e => console.log(e))
}

// Body
(async () => {
    // Auth
    let auth = new Dnevnik.FileAuthenticator("auth.json");
    await auth.init();
    await auth.authenticate();
    let client = new Dnevnik.Client(auth);

    console.log("Accessing " + process.argv[2]);

    switch (process.argv[2]) {
        case "help":
            console.log("schoolInfo\nprofile\naverageMarks\ngetMeshAnswers <test id>\n");
            break;
        case "schoolInfo":
            await requestSchoolInfo(client);
            break;
        case "profile":
            await requestProfile(client);
            break;
        case "averageMarks":
            await requestAverageMarks(client);
            break;
        case "getMeshAnswers":
            if (process.argv.length < 4) {
                console.log("Error! Usage: node client getMeshAnswers <test id>");
                process.exit(1);
            }
            let test_id = Number(process.argv[3].trim())
            await requestMeshAnswers(test_id);
        default:
            break;
    }

    await auth.close();
    process.exit(0);
})();