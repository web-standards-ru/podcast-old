const { existsSync, readFileSync } = require('fs');

/**
 * Main template folder
 * @default 'templates' root folder.
 */
const TPL_FOLDER = process.argv[2] || 'templates';
// Check that directory with templates exists
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
const [DATE_PARSE_FORMAT, DATE_SHOW_FORMAT] = ['DD MMMM YYYY Z', 'ddd, D MMM Y hh:mm:ss ZZ'];

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const MP3_BITRATE = 8000;
/**
 * Web-standarts URLS fabric
 */
const WS_SITE = {
    domain: 'web-standards.ru',
    paths: {
        podcast: '/podcast/episodes'
    }
}

module.exports = {
    TPL_FOLDER,
    MD_FOLDER,
    XML_ITEM_TPL,
    XML_WRAPPER_TPL,
    DATE_PARSE_FORMAT,
    DATE_SHOW_FORMAT,
    IS_PRODUCTION,
    MP3_BITRATE,
    WS_SITE,
};
