const { MP3_TIME_PADDING } = require('./constants');

/**
 * Converting seconds to 'hh:mm:ss:'
 * @see https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
 *
 * @param   {Number} secs - seconds
 * @returns {String}
 */
module.exports = data => {
    const secs = data - MP3_TIME_PADDING;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor((secs % 3600) % 60);
    return `${`0${h}`.slice(-2)}:${`0${m}`.slice(-2)}:${`0${s}`.slice(-2)}`;
};
