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
                console.warn(`HTTPS: file ${url} not found`);
                resolve(0);
            })
    });
}
