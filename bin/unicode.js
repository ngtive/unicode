#!/usr/bin/env node
const unicode = require('../index');
const chalk = require('chalk');
const {terminalWidth} = require("yargs");

const argv = require("yargs/yargs")(process.argv.slice(2))
    .command('status <nationalcode>', 'Show national code status, if user was registered prints contract company')
    .command('revoke <nationalcode>', 'Revoke contract with national_code')
    .command('register <nationalcode> <firstname> <lastname> <fathername> <phone> <email> <birthDate>', 'Register contract with national_code')
    .command('code <nationalcode>', 'Show national code unicode')
    .command('reactive <nationalcode>', 'ReActive User')

    .alias('u', 'username')
    .alias('p', 'password')
    .string('p')
    .string('u')
    .describe('u', 'Mimt username')
    .describe('p', 'Mimt password')
    .help()
    .version()
    .wrap(terminalWidth())

    .argv;

unicode().then((unicode) => {

    if (argv.p && argv.u) {
        unicode.setConfig(argv.u, argv.p);
    } else {
    }

    switch (argv._[0]) {
        case 'register':
            return unicode.Register(argv.nationalcode, argv.firstname, argv.lastname, argv.fathername, argv.phone, argv.email, argv.birthDate)
                .then((result) => {
                    console.log(chalk.green.bold(`Unicode: ${result}`));
                }).catch((e) => {
                    console.log(chalk.red('Already activated in a company'));
                });
        case 'status':
            unicode.GetPersonStatus(argv.nationalcode)
                .then((result) => {
                    if (result == 'ActivePerson') {
                        console.log(chalk.green.bold('Active Person'));
                        unicode.GetPersonCompany(argv.nationalcode)
                            .then((result) => {
                                console.log(chalk.white.bold(`Company: ${result}`));

                                unicode.GetPersonCode(argv.nationalcode)
                                    .then((result) => {
                                        console.log(chalk.green.bold(`Unicode: ${result}`));
                                    });
                            });
                    } else {
                        console.log(chalk.yellow.bold('FreePerson'));
                    }
                });
                return;

        case 'code':
            unicode.GetPersonCode(argv.nationalcode)
                .then((result) => {
                    if (result == 'error:InvalidPerson') return console.log(chalk.red.bold('Invalid Person'));
                    console.log(chalk.green.bold(result));
                });

        case 'revoke':
            unicode.Revoke(argv.nationalcode)
                .then(result => {
                    if (result == 'error:InvalidPerson') return console.log(chalk.red.bold('Invalid Person'));
                    console.log(chalk.green.bold('Done!'));
                });

        case 'reactive':
            unicode.ReActive(argv.nationalcode)
                .then(result => {
                    if (result == "'true'") return console.log(chalk.green.bold('Done!'));
                    return console.log(chalk.red.bold(result));
                });
    }
});