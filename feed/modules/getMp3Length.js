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
    const url = `${WS_SITE_URLS.episodes}/${id}.mp3`;

    return new Promise((resolve, reject) => {
        return getFile(url)
            .then(size => {
                resolve({ size, duration: hhmmss(size / MP3_BITRATE) });
            })
            .catch(err => reject({ err }));
    })
}
