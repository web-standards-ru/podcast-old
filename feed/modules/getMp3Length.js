const getFile = require('./getFileHeaders');
const hhmmss = require('./timeToStringConverter');

const {
    MP3_BITRATE,
    WS_SITE_URLS
} = require('./constants');

/**
 * Get mp3 file size and calculate duration
 *
 * @param   {Number}    id - podcast ID
 * @returns {Promise}   object contains size and dutation of file
 */
module.exports = (id) => {

    return new Promise((resolve, reject) => {
        return getFile(`${id}.mp3`)
            .then(size => {
                resolve({ size, duration: hhmmss(size / MP3_BITRATE) });
            })
            .catch(err => reject({ err }));
    })
}
