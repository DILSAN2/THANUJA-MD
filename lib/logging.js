const chalk = require('chalk');

exports.logInfo = (text) => {
    console.log(chalk.blueBright('[INFO]'), text);
};

exports.logError = (text) => {
    console.log(chalk.red('[ERROR]'), text);
};

exports.logSuccess = (text) => {
    console.log(chalk.green('[SUCCESS]'), text);
};
