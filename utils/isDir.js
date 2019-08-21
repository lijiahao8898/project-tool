const fs = require('fs');
const chalk = require('chalk');

module.exports = function(name) {
    return new Promise ((resolve, reject) => {
        fs.exists(name, exists => {
            if (exists) {
                console.log(chalk.red(
                    `The ${name} folder already exists in the current directory. Please try to use another one!`
                ));
                process.exit(1);
                reject(exists);
            } else {
                resolve();
            }
        });
    });
};
