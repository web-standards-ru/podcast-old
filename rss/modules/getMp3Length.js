const getFile = require('./getFile');
const hhmmss = require('./timeToStringConverter');

/**
 * Get mp3 file size and calculate duration
 *
 * @param   {Number}    id - podcast ID
 * @returns {Promise}   object contains size and dutation of file
 */
module.exports = (id) => {
    const url = `https://web-standards.ru/podcast/episodes/${id}.mp3`;

    return new Promise((resolve, reject) => {
        return getFile(url)
            .then(size => {
                resolve({ size, duration: hhmmss(size / 8000) });
            })
            .catch(err => reject(err));
    })
}
