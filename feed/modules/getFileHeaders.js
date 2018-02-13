const { request } = require('https');
const { WS_SITE } = require('./constants');

/**
 * Get file headers
 * @param {String} file - filename
 * @returns {Promise}   - resolve content-length of file
 */
module.exports = (file) => {
    const options = {
        host: WS_SITE.domain,
        path: `${WS_SITE.paths.podcast}/${file}`,
        method: 'HEAD',
    };

    return new Promise((resolve, reject) => {
        return request(options, (res) => {
            const length = +res.headers['content-length']
            if (res.statusCode !== 200) {
                return reject(`File https://${options.host}${options.path} not found on server`);
            }
            return resolve(length);
        }).end();
    })
}
