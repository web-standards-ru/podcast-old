const { readFile } = require('fs');
const moment = require('moment');
const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true });

const getMp3Length = require('./getMp3Length');
const { MD_FOLDER, DATE_PARSE_FORMAT, DATE_SHOW_FORMAT } = require('./constants');

moment.locale('RU');
/**
 * Parse *.md file and return object
 *
 * @param   {String} file   - filename
 * @returns {Object}        object with only top level
 */
module.exports = (file) => {
    return new Promise((resolve, reject) => {
        readFile(`${MD_FOLDER}/${file}`, (err, data) => {
            if (err) {
                return reject(err);
            }

            const content = data.toString();
            const header = content.match(/^#.+/)[0];
            const paragraphs = content.match(/[^\n].*/g);

            const N = header.match(/\d+/)[0];
            const title = header.match(/\S+\s+.\d+/)[0];
            const summary = paragraphs[1]
                .replace(/.+:\s/, '')
                .replace(/`/g, '')
                .replace(/</g, '&#x3C;')
                .replace(/>/g, '&#x3E;');
            const dateRaw = paragraphs[1].match(/\d+ \S+ \d+:/) ?
                paragraphs[1].match(/.+:/)[0]
                    .replace(':', '') :
                '';
            const date = moment(dateRaw, DATE_PARSE_FORMAT).locale('en').format(DATE_SHOW_FORMAT);
            const html = converter.makeHtml(content.replace(/^#.*\n\n/, '# '));

            /**
             * fabric to create array of authors
             * returning array because I can use it as array in future
             *
             * @returns {Array}     - array of authors
             */
            const authors = (function () {
                const _authors = [];
                let i = 0;
                paragraphs.splice(0, 2);

                while (paragraphs[i].indexOf('- ') > -1) {
                    _authors.push(paragraphs[i]);
                    i += 1;
                }

                return _authors.map(item => item.replace(/- /, ''));
            })();


            /**
             * After getting mp3 info resolving Object on top
             *
             * @param   {Number} N  - podcast ID
             * @returns {Promise}   resolve object for XML template generator
             */
            return getMp3Length(N)
                .then(length => process.nextTick(resolve(
                    { N, title, summary, date, authors: authors.join(', '), size: length.size, duration: length.duration, html })))
                .catch(err => reject(err));

        })
    })
}
