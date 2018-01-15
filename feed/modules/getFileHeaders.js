const { exec } = require('child_process');

/**
 * Get file headers via curl
 * @param   {String}    - file url
 * @returns {Promise}   - resolve content-length of file
 */
module.exports = (url) => {
    return new Promise((resolve, reject) => {
        return exec(`curl -I ${url} | grep 'content-length: '`, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }

            const length = stdout.match(/\d+/);
            resolve(+length[0]);

        });
    });
}
