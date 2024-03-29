#! /usr/bin/env node
const { program } = require('commander');
const {DateTime, Interval} = require("luxon");
const Dnevnik = require("dnevnik-mos-ru-api");

program
    .command("help")
    .description("Вывод всех комманд")
    .action(require("./commands/help"));

program
    .command("auth <login> <password>")
    .description("Генерация токена для авторизации (auth.json)")
    .option("-t, --totp <totp>", "TOTP ключ для 2FA (если включена двухфакторая аутентификация в профиле mos.ru)")
    .option("-s, --show", "Показать окно браузера")
    .option("-p, --path <path>", "Указать директорию для сохранения auth.json", "./")
    .action(require("./commands/auth"));

program
    .command("schoolInfo")
    .alias("school")
    .option("-f, --find <item>", "Вывод определенного элемента")
    .option("-l, --list", "Список всех доступных элементов")
    .description("Получение всей информации о школе")
    .action(require("./commands/schoolInfo"));

program
    .command("profile")
    .description("Получение всей информации о своем профиле")
    .action(require("./commands/profile"));

program
    .command("subjects")
    .description("Получение всех предметов в расписании")
    .action(require("./commands/subjects"));

program
    .command("averageMarks")
    .alias("marks")
    .description("Получение среднего балла по всем предметам за учебный год")
    .action(require("./commands/averageMarks"));

program
    .command("quarterMarks")
    .alias("qMarks")
    .description("Получение оценки по всем предметам за все четверти/триместры/полугодия")
    .action(require("./commands/quarterMarks"));

// TODO - fix progress command
// program
//     .command("progress")
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение академического прогресса")
//     .action(require("./commands/progress"))

program
    .command("schedule [days]")
    .description("Получение расписания на указанный день (по умолчанию: завтра [1])\n"
    + "В [days] можно указать кол-во дней с текущего (сегодня + [days] дней)\n"
    + "Пример: dvnk schedule 2 - покажет расписание на послезавтра")
    .action(require("./commands/schedule"));

program
    .command("homework [from] [to]")
    .description("Получение домашнего задания на указанный промежуток (по умолчанию: сегодня [0] [0])\n"
    + "В [from] можно указать кол-во дней с текущего (сегодня + [from] дней)\n"
    + "В [to] можно указать до какого (включетельно) кол-ва дней (сегодня + [to] дней)\n"
    + "Пример 1: dvnk homework 2 - покажет домашние задания на послезавтра\n"
    + "Пример 2: dvnk homework 0 1 - покажет домашние задания с сегодня по завтра")
    .action(require("./commands/homework"));

// TODO - fix visits command
// program
//     .command("visits [months]")
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение списка посещаемости (по умолчанию: последний месяц [1])\n"
//     + "В [months] можно указать кол-во месяцев")
//     .action(require("./commands/visits"));

// TODO - fix balance command
// program
//     .command("balance [months]")
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение списка посещаемости (по умолчанию: последний месяц [1])\n"
//     + "В [months] можно указать кол-во месяцев")
//     .action(require("./commands/balance"));

program
    .command("getTeacher <id>")
    .alias("teacher")
    .description("Получение информации об учителе\n"
    + "В <id> указать айди учителя")
    .action(require("./commands/getTeacher"));

// TODO - fix meshAnswers with different user permissions
// program
//     .command("getAnswers <id>")
//     .aliases(["answers", "meshAnswers", "getans"])
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение ответов на тест из МЭШ\n"
//     + "В <id> указать айди теста")
//     .action(require("./commands/getAnswers"));

program
    .command("notifications [type]")
    .description("Получение последний уведомлений (по умолчанию: новое домашнее задание [create_homework])")
    .action(require("./commands/notifications"));

program
    .command("menu")
    .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
    + "Получение меню столовой")
    .action(require("./commands/menu"));

program.parse();