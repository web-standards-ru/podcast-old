const { readFileSync } = require('fs');
const collectEpisodes = require('../modules/collectEpisodes');
const moment = require('moment-timezone');
const { MD_FOLDER } = require('../modules/constants');

/**
 *
 * @param {string} content
 */
function validate(content) {
    const header = content.match(/^#.+/)[0];
    const title = header.match(/\S+\s+.\d+/)[0];
    const paragraphs = content.match(/[^\n].*/g);
    const locale = title.toLowerCase().indexOf('episode') > -1 ? 'en' : 'ru';
    moment.locale(locale);
    const _date = moment(paragraphs[1], 'LL');

    if (!_date.isValid()) {
        console.log('\033[31m', `Date format for ${title} is not valid`);
        process.exit(1);
    }
}

collectEpisodes
    .then(async episodes => {
        for (const file of episodes) {
            const data = readFileSync(`${MD_FOLDER}/${file}`);
            validate(data.toString());
        }

        console.log('\033[32m', `Successfuly validated ${episodes.length} episodes`);
    })
    .catch(console.error)
