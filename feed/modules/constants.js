const { existsSync, readFileSync } = require('fs');

const TPL_FOLDER = process.argv[2] || 'templates';

if (!existsSync(`${__dirname}/../${TPL_FOLDER}`)) {
    return console.error('Make sure that you entered a valid directory with templates');
}

const MD_FOLDER = `${__dirname}/../../episodes/`;
const XML_ITEM_TPL = readFileSync(`${__dirname}/../${TPL_FOLDER}/episode.xml`).toString();
const XML_WRAPPER_TPL = readFileSync(`${__dirname}/../${TPL_FOLDER}/feed.xml`).toString();
/**
 * @param DATE_PARSE_FORMAT 1 января 20017
 * @param DATE_SHOW_FORMAT  Mon, 1 Jan 2017 00:00:00 +0000
 */
const [DATE_PARSE_FORMAT, DATE_SHOW_FORMAT] = ['DD MMMM YYYY Z', 'ddd, D MMM Y hh:mm:ss Z'];

module.exports = {
    TPL_FOLDER,
    MD_FOLDER,
    XML_ITEM_TPL,
    XML_WRAPPER_TPL,
    DATE_PARSE_FORMAT,
    DATE_SHOW_FORMAT,
};
