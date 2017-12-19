const { get } = require('https');
/**
 * Get file via https module
 * @param   {String}    - file url
 * @returns {Promise}   - resolve content-length of file
 */
module.exports = (url) => {
    return new Promise((resolve) => {
        return get(url, res => resolve(res.headers['content-length']))
            .on('error', err => {
                resolve(0);
                console.warn(`HTTPS: file ${id} not found`);
            })
    });
}
