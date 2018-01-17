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
            const header = +res.headers['content-length']
            // TODO: consult to add some other header like x-xss-protection to check file realy exists
            if (header === undefined || header === 166) {
                return reject(`File https://${options.host}/${options.path} not found on server`);
            }

            return resolve(header);
        }).end();
    })
}
