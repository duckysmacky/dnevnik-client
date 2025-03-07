#!/usr/bin/env node
import { program } from 'commander';

import * as commands from './commands/index.js';

program
    .command("help")
    .description("Вывод всех комманд")
    .action(commands.help);

program
    .command("auth <login> <password>")
    .description("Генерация токена для авторизации (auth.json)")
    .option("-t, --totp <totp>", "TOTP ключ для 2FA (если включена двухфакторая аутентификация в профиле mos.ru)")
    .option("-s, --show", "Показать окно браузера")
    .option("-p, --path <path>", "Указать директорию для сохранения auth.json", "./")
    .action(commands.auth);

program
    .command("schoolInfo")
    .alias("school")
    .option("-f, --find <item>", "Вывод определенного элемента")
    .option("-l, --list", "Список всех доступных элементов")
    .description("Получение всей информации о школе")
    .action(commands.schoolInfo);

program
    .command("profile")
    .description("Получение всей информации о своем профиле")
    .action(commands.profile);

program
    .command("subjects")
    .description("Получение всех предметов в расписании")
    .action(commands.subjects);

program
    .command("averageMarks")
    .alias("marks")
    .description("Получение среднего балла по всем предметам за учебный год")
    .action(commands.averageMarks);

program
    .command("quarterMarks")
    .alias("qMarks")
    .description("Получение оценки по всем предметам за все четверти/триместры/полугодия")
    .action(commands.quarterMarks);

// TODO - fix progress command (404 bad request)
// program
//     .command("progress")
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение академического прогресса")
//     .action(commands.progress)

program
    .command("schedule [days]")
    .description("Получение расписания на указанный день (по умолчанию: завтра [1])\n"
    + "В [days] можно указать кол-во дней с текущего (сегодня + [days] дней)\n"
    + "Пример: dvnk schedule 2 - покажет расписание на послезавтра")
    .action(commands.schedule);

program
    .command("homework [from] [to]")
    .description("Получение домашнего задания на указанный промежуток (по умолчанию: сегодня [0] [0])\n"
    + "В [from] можно указать кол-во дней с текущего (сегодня + [from] дней)\n"
    + "В [to] можно указать до какого (включетельно) кол-ва дней (сегодня + [to] дней)\n"
    + "Пример 1: dvnk homework 2 - покажет домашние задания на послезавтра\n"
    + "Пример 2: dvnk homework 0 1 - покажет домашние задания с сегодня по завтра")
    .action(commands.homework);

// TODO - fix visits command
// program
//     .command("visits [months]")
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение списка посещаемости (по умолчанию: последний месяц [1])\n"
//     + "В [months] можно указать кол-во месяцев")
//     .action(commands.visits);

// TODO - fix balance command
// program
//     .command("balance [months]")
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение списка посещаемости (по умолчанию: последний месяц [1])\n"
//     + "В [months] можно указать кол-во месяцев")
//     .action(commands.balance);

program
    .command("getTeacher <id>")
    .alias("teacher")
    .description("Получение информации об учителе\n"
    + "В <id> указать айди учителя")
    .action(commands.getTeacher);

// TODO - fix meshAnswers with different user permissions
// program
//     .command("getAnswers <id>")
//     .aliases(["answers", "meshAnswers", "getans"])
//     .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
//     + "Получение ответов на тест из МЭШ\n"
//     + "В <id> указать айди теста")
//     .action(commands.getAnswers);

program
    .command("notifications [type]")
    .alias("latest")
    .description("Получение последних уведомлений")
    .action(commands.notifications);

program
    .command("menu")
    .description("[В РАЗРАБОТКЕ | РАБОТЕТ НЕКОРРЕКТНО]\n"
    + "Получение меню столовой")
    .action(commands.menu);

program.parse();
