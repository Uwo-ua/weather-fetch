#!/usr/bin/env node

import chalk from 'chalk'
import figlet from 'figlet'
import gradient from 'gradient-string'
import fetch from 'node-fetch';
import mod_getopt from 'posix-getopt'

var parser, option;

parser = new mod_getopt.BasicParser('abo:(output)', process.argv);

const sity = process.argv[parser.optind()];

const logo = () => {
    figlet('WFetch', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(gradient.vice(data))
    });
}

logo();

fetch('https://api.openweathermap.org/data/2.5/weather?q='+sity+'&appid=b252e8030c1a48f0d1950fdfbc5cc4bc')
    .then(response => response.json())
    .then(data => {
        var name = data['name'];
        var temp = Math.round(data['main']['temp'] - 273);
        var humidity = data['main']['humidity'];
        var windS = data['wind']['speed'];

        var icont = chalk.red((temp < 10 ) ? '' :
            (temp < 20 ) ? '' : '') ;
        console.log(chalk.hex('#8a79b9').bold(`               ${name.toUpperCase()}\n`));
        console.log(`             Temp: ${chalk.white.bold(temp)} ${icont}`);
        console.log(`             Humidity: ${chalk.white.bold(humidity)}%      `);
        console.log(`             Wind: ${chalk.white.bold(windS)}m/s           `);
        console.log(gradient.vice("----------------------------------\n"))
    })
    .catch(err => after("Wrong city name"))

