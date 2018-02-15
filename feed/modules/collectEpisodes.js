const { readdir } = require('fs');
const { MD_FOLDER } = require('./constants');

module.exports = new Promise((resolve, reject) => {
    return readdir(MD_FOLDER, (err, files) => {
        if (err) {
            return reject(err);
        }

        const isEpisode = (filename) => {
            return !isNaN(+filename.split('-')[1].split('.md')[0])
        }
        const episodes = files
            .filter(filename => isEpisode(filename))
            .sort((prev, next) => {
                const episodeRe = /episode-([0-9]+)\.md/;
                return prev.match(episodeRe)[1] - next.match(episodeRe)[1];
            });

        return resolve(episodes);
    });
});
