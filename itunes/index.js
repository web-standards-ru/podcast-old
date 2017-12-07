const {
    readdir,
    readFile,
    createWriteStream,
    readFileSync,
} = require('fs');
const { get } = require('https');
const moment = require('moment');

moment.locale('RU');

const MD_FOLDER = `${__dirname}/../episodes/`;
const XML_ITEM_TPL = readFileSync(`${__dirname}/_tpl-item.xml`).toString();
const XML_WRAPPER_TPL = readFileSync(`${__dirname}/_tpl-wrapper.xml`).toString();

/**
 * @param DATE_PARSE_FORMAT 1 января 20017
 * @param DATE_SHOW_FORMAT  Mon, 1 Jan 2017 00:00:00 +0000
 */
const [DATE_PARSE_FORMAT, DATE_SHOW_FORMAT] = ['DD MMMM YYYY Z', 'ddd, D MMM Y hh:mm:ss Z'];


readdir(MD_FOLDER, (err, files) => {
    if (err) {
        console.error(err);
        return process.exit(1);
    }

    const isEpisode = (filename) => {
        return !isNaN(+filename.split('-')[1].split('.md')[0])
    }
    const episodes = files.filter(filename => isEpisode(filename));

    Promise.all(episodes.map(episode => prepareTemplate(episode)))
        .then(res => {
            const XML_ITEMS_ARRAY = [];

            // Run foreach cycle to prepare XML array
            res.forEach((episode) => {
                let raw = XML_ITEM_TPL;

                Object.keys(episode).forEach(key => {
                    raw = raw.replace(`{% ${key} %}`, episode[key]);
                })

                XML_ITEMS_ARRAY.push(raw);
            })

            createWriteStream(`${__dirname}/itunes-result.xml`)
                .once('open', function(err) {
                    const content = XML_WRAPPER_TPL.replace('{% items %}', XML_ITEMS_ARRAY.join('\n'));
                    this.write(content);
                    this.end();
                })
                .on('close', () => console.log(`Succesfully written file '${__dirname}/itunes-result.xml'`))
                .on('error', () => console.error('Something wrong try again'));
        })
        .catch(err => console.error(err));

    // TODO remove before production, denug only
    /* prepareTemplate(episodes[94])
        .then(res => console.log(res))
        .catch(err => console.error(err)); */
})


/**
 * Parse *.md file and return object
 *
 * @param   {String} file   - filename
 * @returns {Object}        object with only top level
 */
function prepareTemplate(file) {
    return new Promise((resolve, reject) => {
        readFile(`${MD_FOLDER}/${file}`, (err, data) => {
            if (err) {
                return reject(err);
            }

            const content = data.toString();
            const header = content.match(/^#.+/)[0];
            const paragraphs = content.match(/[^\n].*/g);

            const N = header.match(/\d+/)[0];
            const title = header.match(/\S+\s+.\d+\./)[0];
            const subtitle = paragraphs[1];
            const dateRaw = header.match(/\d+\s.+/) ? header.match(/\d+\s.+/)[0] : '';
            const date = moment(dateRaw, DATE_PARSE_FORMAT).locale('en').format(DATE_SHOW_FORMAT);

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
                .then(lenght => process.nextTick(resolve(
                    { N, title, subtitle, date, authors: authors.join(', '), size: lenght.size, duration: lenght.duration })))
                .catch(err => reject(err));

        })
    })
}

/**
 * Get mp3 file size and calculate duration
 *
 * @param   {Number}    id - podcast ID
 * @returns {Promise}   object contains size and dutation of file
 */
function getMp3Length(id) {
    const url = `https://web-standards.ru/podcast/episodes/${id}.mp3`;

    return new Promise((resolve, reject) => {
        return getFile()
            .then(size => {
                resolve({ size, duration: hhmmss(size / 8000) });
            })
            .catch(err => reject(err));

    })

    /**
     * Get file via https module
     *
     * @returns {Promise}   - resolve content-length of file
     */
    function getFile() {
        return new Promise((resolve) => {
            return get(url, res => resolve(res.headers['content-length']))
                .on('error', err => {
                    resolve(0);
                    console.warn(`HTTPS: file ${id} not found`);
                })
        });
    }
}


/**
 * Converting seconds to 'hh:mm:ss:'
 * @see https://stackoverflow.com/a/31340408
 *
 * @param   {Number} secs - seconds
 * @returns {String}
 */
function hhmmss(secs) {
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60;

    return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);

    function pad(num) {
        return ("0" + num).slice(-2);
    }
}
