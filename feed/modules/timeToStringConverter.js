/**
 * Converting seconds to 'hh:mm:ss:'
 * @see https://stackoverflow.com/a/31340408
 *
 * @param   {Number} secs - seconds
 * @returns {String}
 */
module.exports = (secs) => {
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    const pad = (num) => ("0" + num).slice(-2);

    return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
}
