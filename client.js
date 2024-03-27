const {DateTime, Interval} = require("luxon");
const Dnevnik = require("dnevnik-mos-ru-api");

// Check for correct input
if (process.argv.length < 3) {
    console.log("Error! Usage: node client <function>");
    process.exit(1);
}



// General
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



// Academic
async function requestSubjects(client) {
    await client.getSubjects().then(e => {
        for (let subject of e) {
            console.log(subject.name);
        }
    }).catch(e => console.error(e));
}

async function requestAverageMarks(client) {
    await client.getAverageMarks().then(e => {
        e.forEach(m => console.log(m.name + ": " + Math.round(m.mark * 100) / 100));
    }).catch(e => console.error(e));
}

async function requestQuarterMarks (client) {
    await client.getPerPeriodMarks().then(e => {
        for (let subjectMark of e) {
            console.log(subjectMark.subject_name + ": " + subjectMark.periods.map(e => e.avg_five).join(" | "));
        }
    }).catch(e => console.log(e))
}

// TODO - fix this shit (error 404)
async function requestProgress(client) {
    await client.getProgress().then(e => {
        for (let section of e.sections) {
            for (let subject of section.subjects) {
                console.log(subject.subject_name + " " + subject.passed_hours/subject.total_hours*100 + "%");
            }
        }
    }).catch(e => console.log(e));
}



// Get by time
async function requestSchedule(client, days) {
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

async function requestHomework(client, daysFrom, daysTo) {
    await client.getHomework(
        DateTime.now().plus({days: daysFrom}), 
        DateTime.now().plus({days: daysTo})
    ).then(e => {
        for (let subject of e) {
            console.log(subject.homework_entry.homework.subject.name + ": " + subject.homework_entry.description);
        }
    }).catch(e => console.error(e));
}

// TODO - fix error 404 again
async function requestVisits(client, daysFrom, daysTo) {
    await client.getVisits(
        DateTime.now().plus({days: daysFrom}), 
        DateTime.now().plus({days: daysTo})
    ).then(e => {
        for (let visitDay of e) {
            console.log(visitDay.date.toFormat("dd.MM.yyyy"));
            for (let visit of visitDay.visits) {
                console.log("- "+visit.in.toFormat("HH:mm"));
            }
        }
    }).catch(e => console.log(e));
}

// TODO - fix another error 404
async function requestBalance(client, monthsFrom, monthsTo) {
    await client.getBilling(
        DateTime.now().plus({month: monthsFrom}), 
        DateTime.now().plus({month: monthsTo})
    ).then(e => {
        console.log(e.balance/100)
    }).catch(e => console.log(e));
}



// Get by id
async function requestTeacher(client, id) {
    await client.getTeacher(id).then(e => {
        console.log(e.user.first_name+" "+e.user.middle_name);
    }).catch(e => console.log(e))
}

// TODO - fix mesh answers via requesting as different user (teacher)
async function requestMeshAnswers(id) {
    await Dnevnik.Client.getMeshAnswers(id).then(e => {
        for (let question of e) {
            console.log(question.question + " " + JSON.stringify(question.answer));
        }
    }).catch(e => console.log(e))
}



// Misc
async function requestNotifications(client, type) {
    await client.getNotifications().then(e => {
        for (let notification of e) {
            if(notification.event_type === type) {
                console.log(notification.new_hw_description);
            }
        }
    }).catch(e => console.log(e));
}

// TODO - fix error 400 (bad request)
async function requestMenu(client) {
    await client.getMenu().then(e => {
        for (let meal of e) {
            console.log(meal.meals.map(e => e.name).join(", "));
        }
    }).catch(e => console.log(e));
}



// Body
(async () => {
    // Auth
    let auth = new Dnevnik.FileAuthenticator("auth.json");
    await auth.init();
    await auth.authenticate();
    let client = new Dnevnik.Client(auth);

    console.log("Requesting " + process.argv[2] + "...");

    switch (process.argv[2]) {
        case "help":
            console.log("GENERAL\nschoolInfo\nprofile\n");
            console.log("ACADEMIC\nsubjects\naverageMarks\nquarterMarks\nprogress\n");
            console.log("BY TIME\nschedule [days from today]\nhomework [days from today] [days to]");
            console.log("visits [days from today] [days to]\nbalance [months from current] [months to]\n")
            console.log("BY ID\ngetTeacher <teacher id>\ngetAnswers <test id>\n");
            console.log("MISC\nnotifications [type]\nmenu\n");
            break;

        // General
        case "schoolInfo":
            await requestSchoolInfo(client);
            break;

        case "profile":
            await requestProfile(client);
            break;

        // Academic
        case "subjects":
            await requestSubjects(client);
            break;

        case "averageMarks":
            await requestAverageMarks(client);
            break;

        case "quarterMarks":
            await requestQuarterMarks(client);
            break;

        case "progress":
            await requestProgress(client);
            break;

        // Get by time
        case "schedule": {
            let days = 0;
            if (process.argv.length == 4) {
                days = Number(process.argv[3]);
            }

            await requestSchedule(client, days);}
            break;

        case "homework": {
            let daysFrom = 1;
            if (process.argv.length == 4) {
                daysFrom = Number(process.argv[3]);
            }

            let daysTo = daysFrom;
            if (process.argv.length == 5) {
                daysTo = Number(process.argv[4]);
            }

            await requestHomework(client, daysFrom, daysTo);}
            break;

        case "visits": {
            let daysFrom = 1;
            if (process.argv.length == 4) {
                daysFrom = Number(process.argv[3]);
            }

            let daysTo = daysFrom;
            if (process.argv.length == 5) {
                daysTo = Number(process.argv[4]);
            }
            
            await requestVisits(client, daysFrom, daysTo);}
            break;

        case "balance": {
            let monthsFrom = -3;
            if (process.argv.length == 4) {
                monthsFrom = Number(process.argv[3]);
            }

            let monthsTo = monthsFrom + 3;
            if (process.argv.length == 5) {
                monthsTo = Number(process.argv[4]);
            }

            await requestBalance(client, monthsFrom, monthsTo)};
            break;

        // Get by id
        case "getTeacher":
            if (process.argv.length < 4) {
                console.log("Error! Usage: node client getTeacher <teacher id>");
                process.exit(1);
            }

            let teacher_id = Number(process.argv[3].trim())
            await requestTeacher(client, teacher_id);
            break;

        case "getAnswers":
            if (process.argv.length < 4) {
                console.log("Error! Usage: node client getAnswers <test id>");
                process.exit(1);
            }

            let test_id = Number(process.argv[3].trim())
            await requestMeshAnswers(test_id);
            break;

        // Misc
        case "notifications": {
            let type = "create_homework";

            if (process.argv.length == 4) {
                type = process.argv[3].trim();
            }

            await requestNotifications(client, type);}
            break;

        case "menu":
            await requestMenu(client);
            break;

        default:
            console.log("Invalid command! For the full list see: node client help");
            break;
    }

    await auth.close();
    process.exit(0);
})();