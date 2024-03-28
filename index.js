#! /usr/bin/env node
const { program } = require('commander');
const {DateTime, Interval} = require("luxon");
const Dnevnik = require("dnevnik-mos-ru-api");

program
    .command("help")
    .description("Show all commands")
    .action(require("./commands/help"));

program
    .command("auth <login> <password> [totp]")
    .description("Generates token for authenticating")
    .action(require("./commands/auth"))

program.parse();